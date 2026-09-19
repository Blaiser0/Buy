"""Read-only DOCX extraction for the catalog dry run. Does not access the DB."""
import json
import re
import sys
from pathlib import Path
from docx import Document

root = Path(__file__).resolve().parents[1]
sys.stdout.reconfigure(encoding='utf-8')
out = root / 'reports' / 'catalog-import'
out.mkdir(parents=True, exist_ok=True)
documents = []
for path in sorted((root / 'By_photos').glob('*.docx')):
    doc = Document(path)
    paragraphs = [p.text for p in doc.paragraphs]
    if path.name.startswith('El ANUA'):
        for rid in doc.paragraphs[103]._p.xpath('.//a:blip/@r:embed'):
            (out / 'anua-unnamed.png').write_bytes(doc.part.related_parts[rid].blob)
        for label,start,end in [('anua-pdrn',10,22),('boj-solar',121,130),('tirtir',954,962)]:
            for i in range(start,end):
                for rid in doc.paragraphs[i]._p.xpath('.//a:blip/@r:embed'):
                    (out / f'{label}.png').write_bytes(doc.part.related_parts[rid].blob)
    documents.append({'file': path.name, 'paragraphs': paragraphs,
                      'tables': [[[c.text for c in r.cells] for r in t.rows] for t in doc.tables]})
    print('\nDOCUMENT', path.name, 'paragraphs', len(paragraphs), 'tables', len(doc.tables))
    start = 0
    count = 0
    for i, text in enumerate(paragraphs):
        if re.search(r'S\s*/\.?\s*\d+(?:\.\d+)?\s*(?:SOLES)?\s*$', text, re.I):
            if 'recomendado' in text.lower():
                continue
            count += 1
            heads = [(j, t.replace('\n', ' | ')[:105]) for j, t in enumerate(paragraphs[start:i], start) if t.strip()]
            print(count, f'[{start}:{i}]', heads[:2], 'PRICE', text[-30:])
            start = i + 1
    print('PRICE BLOCKS', count)
(out / 'word-extraction.json').write_text(json.dumps(documents, ensure_ascii=False, indent=2), encoding='utf-8')
