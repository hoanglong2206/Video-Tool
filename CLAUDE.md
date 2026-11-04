# AI AGENT CODING INSTRUCTIONS & REPOSITORY CONVENTIONS

> **Document Version:** 2.0.0  
> **Target Audience:** AI Coding Assistants (Claude, Antigravity, Copilot), Engineers  
> **Toolchain:** Bun (v1.1+), Next.js 16 (React 19), FastAPI (Python 3.11+)  
> **Parent Context:** [PROJECT.md](PROJECT.md)

---

## 1. Golden Directives for AI Agents

1.  **Honesty in Implementation Status:** Never claim an unwritten feature, API endpoint, or component exists. The repository is a **greenfield workspace**; treat the codebase as the sole source of truth.
2.  **No Unnecessary Microservices or Heavy Databases:** Do not introduce PostgreSQL, pgvector, Alembic migrations, or S3/MinIO setups. Projects use a clean **File-Based Project Workspace** architecture (`projects/<id>/project.json`, `scenes.json`, `assets/`, `renders/`).
3.  **No Authentication Overhead:** This is a dedicated internal studio tool for the creator. Do not write login, register, OAuth2, or JWT authorization screens or middleware.
4.  **Strict Frontend Directory Structure in `apps/web`:**
    All features must follow the **Feature-Sliced Architecture**:
    ```text
    app/features/<feature-name>/
    ├── <FeatureName>.tsx       # Container Component (only wires hooks & layout)
    ├── index.ts                # Public API (exports FeatureName and public types)
    ├── types.ts                # Internal feature types
    ├── hooks/                  # Feature custom hooks & business logic
    └── components/             # Sub-components grouped by function
        ├── <group-a>/
        └── <group-b>/
    ```
    All external network calls, AI generation triggers, and render API clients must reside in modular service folders under:
    ```text
    app/services/<service-name>/
    ├── index.ts                # Public API (export service instance & public types)
    ├── types.ts                # Kiểu dữ liệu / types của service
    └── <các file nghiệp vụ>    # client.ts, handlers.ts, utils.ts, etc.
    ```
5.  **Declarative Scene DSL Primacy:** Video compositions are modeled strictly via `@video-ai/scene-dsl`. Never write ad-hoc imperative rendering scripts.
6.  **Toolchain Standard:** Always use **Bun** for all TypeScript/Node workspaces (`bun install`, `bun run dev`, `bun test`).

---

## 2. Essential Development Commands

### 2.1 Workspace Orchestration with Bun
```bash
# Install all dependencies across Bun workspaces
bun install

# Run all packages and apps in development mode
bun run dev

# Run unit and contract tests across all workspaces
bun test

# Run type checks across all workspaces
bun run check
```

### 2.2 Frontend Studio (`apps/web` with Next.js 16)
```bash
# Run Next.js 16 development server with Turbopack
cd apps/web && bun run dev

# Build production bundle
cd apps/web && bun run build

# Run Playwright visual regression tests
cd apps/web && bun run test:e2e
```

### 2.3 Backend API (`apps/server` with FastAPI)
```bash
# Run FastAPI server with auto-reload
cd apps/server && uvicorn src.main:app --host 0.0.0.0 --port 8000 --reload

# Run Python linting and type checks
cd apps/server && ruff check . && mypy src/

# Run backend pytest suite
cd apps/server && pytest -v
```

### 2.4 Render Engine (`apps/render`)
```bash
# Run local render worker daemon
cd apps/render && bun run dev

# Run Remotion standalone preview
cd apps/render && bun run preview

# Execute NVENC test render with local project directory
cd apps/render && bun run test:render -- --project-dir ../../projects/demo-test
```

---

## 3. Code Standards & Architecture Guidelines

### 3.1 TypeScript & React (Next.js 16)
*   **Container Component Rule:** The top-level `<FeatureName>.tsx` must never contain raw fetch calls, inline styling clutter, or complex calculations. It only connects hooks from `hooks/` to components in `components/`.
*   **Public API Boundary:** Always import features via their public index:
    ```typescript
    // Correct
    import { AssetGenerator } from '@/features/asset-generator';
    // Forbidden
    import { AssetGenerator } from '@/features/asset-generator/AssetGenerator';
    ```
*   **Zustand Atomic Selectors:** Never use global store destructuring. Always use fine-grained selectors:
    ```typescript
    // Correct
    const currentFrame = usePlaybackStore((s) => s.currentFrame);
    // Incorrect
    const { currentFrame } = usePlaybackStore();
    ```

### 3.2 Python Clean Architecture (`apps/server`)
*   Domain entities (`src/domain/`) have zero external library dependencies.
*   File-based repositories must handle asynchronous disk I/O cleanly using `aiofiles` or `pathlib`.
*   AI generation tasks must be structured as pluggable adapters implementing `IAIEngine`.

### 3.3 Git Commit Conventions
All commit messages must strictly follow **Conventional Commits**:
`<type>(<scope>): <short description>`
*   **Types:** `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`, `ci`.
*   **Scopes:** `web`, `server`, `render`, `contracts`, `scene-dsl`, `animation`, `preset-apple`, `assets`, `docs`, `repo`.
*   **Rules:** Imperative mood, no trailing period, $\le 72$ characters, atomic commits.
    *   *Example:* `feat(web/timeline): add spring physics curve inspector`
    *   *Example:* `fix(render/nvenc): prevent pipe buffer starvation on 4K60 encode`
    *   *Example:* `docs(api): add customer photo img2img payload examples`

---

## 4. Verification Checklists for AI Agents

Before submitting code:
*   [ ] Commit messages adhere to Conventional Commits format with appropriate monorepo scope.
*   [ ] No references to deleted `IMPLEMENTATION_ROADMAP.md`.
*   [ ] No unnecessary database dependencies (PostgreSQL/pgvector) or auth middleware added.
*   [ ] All web UI components live within `app/features/<feature-name>/` or `app/services/`.
*   [ ] Commands use `bun` instead of `pnpm` or `npm`.
*   [ ] Scene DSL updates validate against `@video-ai/scene-dsl` schemas.
*   [ ] All Markdown documentation cross-references use valid relative links.

---

## 5. Documentation Sitemap

*   **Architecture & Systems:** [PROJECT.md](PROJECT.md), [SYSTEM_OVERVIEW.md](docs/architecture/SYSTEM_OVERVIEW.md), [DATA_FLOW.md](docs/architecture/DATA_FLOW.md)
*   **Applications:** [apps/web](apps/web/ARCHITECTURE.md), [apps/server](apps/server/ARCHITECTURE.md), [apps/render](apps/render/ARCHITECTURE.md), [packages](packages/ARCHITECTURE.md)
*   **API & Workflows:** [API_CONTRACTS.md](docs/api/API_CONTRACTS.md), [AI_WORKFLOWS.md](docs/workflows/AI_WORKFLOWS.md), [RENDERING_PIPELINE.md](docs/architecture/RENDERING_PIPELINE.md)
*   **Decisions & Standards:** [ARCHITECTURE_DECISIONS.md](docs/architecture/ARCHITECTURE_DECISIONS.md), [CODING_STANDARDS.md](docs/development/CODING_STANDARDS.md)
