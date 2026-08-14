# CV

My resume, from one source of truth, in every format a recruiter might ask for.

## Source of truth

Everything lives in `content/cv.fr.md` and `content/cv.en.md` — YAML frontmatter for the
structured data, an optional markdown body for a free-prose summary. Edit those files and
nothing else; the website and every export are generated from them.

The shape is validated by `src/lib/resume/schema.ts` (zod), so a typo fails the build with the
offending field path instead of silently dropping a section.

## Outputs

| Output                       | Produced by                                               |
| ---------------------------- | --------------------------------------------------------- |
| Website                      | SvelteKit, prerendered — `/` (French), `/en` (English)    |
| `.md`                        | `src/lib/resume/markdown.ts`                              |
| `.json`                      | the validated data object                                 |
| `.docx` `.odt` `.rtf` `.txt` | pandoc, from the generated markdown                       |
| `.pdf`                       | Playwright printing the built site's own print stylesheet |

Downloads are served from `/exports/cv-<locale>.<ext>` and linked in the page header.

## Commands

```bash
pnpm dev            # website only, no exports
pnpm export         # export:docs → build → export:pdf; writes static/exports/
pnpm run local:test # unit + e2e (run `pnpm export` first — e2e checks the downloads)
```

`pnpm export` needs **pandoc** on PATH and a Playwright chromium install.

## Deployment

Pushing to `master` runs `.github/workflows/deploy.yml`, which regenerates every format and
deploys the Worker — so the published files can never drift from `content/`. It needs the
`CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` repository secrets.

Pull requests run `.github/workflows/ci.yml`: lint, typecheck, unit tests, a full export (which
doubles as the content validation gate) and the e2e suite.
