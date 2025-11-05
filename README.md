# CLP-React

## Tech Stack

1. [React](https://react.dev/learn) 19 + TypeScript + Vite
2. [`Zustand`](https://zustand.docs.pmnd.rs/getting-started/introduction) for state management
3. [`Vitest`](https://vitest.dev/) for unit testing 

This document provides a **professional, beginner-friendly guide** to setting up and working with a React 19 + TypeScript + Vite + Vitest project.  
It covers **project structure, naming conventions, services, modules, components, routing, store management (Zustand), and testing with Vitest**.

---

## 🚀 Project Setup

Run the following command to start with:

```
git clone https://github.com/Cholamandalam/CLP-React.git
cd CLP-React
npm install
```

Run the project in **Dev** mode:

```
npm run dev
```

---

## Makefile Commands

| Command                | Description                      |
| ---------------------- | -------------------------------- |
| `make dev`             | Run the Vite dev server          |
| `make build`           | Build the production bundle      |
| `make test`            | Run Vitest                       |
| `make lint-fix`        | Lint & auto-fix issues           |
| `make format`          | Run Prettier formatter           |
| `make storybook`       | Start Storybook dev server       |
| `make build-storybook` | Build static Storybook           |
| `make preview`         | Preview built Vite app           |
| `make clean`           | Remove `node_modules` and `dist` |
| `make help`            | Show all available commands      |


---

## Naming Convention for GitHub Branches

Please follow the below guidelines when creating new branches in GitHub:

---

### Branch Types

1. **`feature/<task-name>`** → For new implementation tasks. *Example:* `feature/slider-component`

2. **`bugfix/<task-name>`** → For bug fixes. *Example:* `bugfix/page-loader-issue`

---

### Naming Rules

✅ Use **only lowercase letters**

✅ Use **hyphens (-)** to separate words

✅ Must follow the **`feature/*`** or **`bugfix/*`** pattern

---

Examples of valid branch names:

* `feature/add-user-authentication`
* `bugfix/navbar-alignment-issue`

Please ensure all new branches adhere to this convention.

---

## 📂 Folder Structure

A recommended folder structure for scalability and maintainability:

```
src/
 ├── core/                         # Shared/common resources
 │    ├── assets/                  # Static assets (images, icons, etc.)
 │    │     └── logo.png
 │    │
 │    ├── cdf-components/          # custom re-usable ui components
 │    │     └── button/
 │    │           └── CdfButton.tsx
 │    │
 │    ├── components/              # Shared reusable components
 │    │     └── button/
 │    │           └── CdfButton.tsx
 │    │
 │    ├── config/                  # Shared config files
 │    │     └── appConfig.ts
 │    │
 │    ├── constants/               # Shared constants
 │    │     └── appConstants.ts
 |    |     └── endpoints.ts       # All endpoints of modules are aggregated here
 │    │
 │    ├── hooks/                   # Shared/custom React hooks if any
 │    │     └── useAuth.ts
 │    │
 │    ├── interceptors/            # Axios interceptors / middlewares
 │    │     └── apiInterceptor.ts
 │    │
 │    ├── routes/                  # Shared route definitions
 │    │     └── appRoutes.tsx
 │    │
 │    ├── services/                # Shared API services
 │    │     └── apiService.ts
 │    │
 │    ├── store/                   # Shared Zustand slices
 │    │     └── appSlice.ts
 │    │
 │    ├── types/                   # Shared types/interfaces
 │    │     └── apiTypes.ts
 │    │
 │    └── utils/                   # Shared utility/helper functions
 │          └── helpers.ts
 │
 ├── modules/                      # Feature-specific modules
 │    └── enquiry/
 │         ├── components/         # Module-specific UI components
 │         │     └── EnquiryForm.tsx
 │         ├── constants/          
 │         │     └── endpoint.ts   # Module-specific api url configuration
 │         ├── containers/         # Page-level components
 │         │     └── EnquiryPage.tsx
 │         ├── routes/             # Module-specific routes
 │         │     └── enquiryRoutes.tsx
 │         ├── services/           # Module API services
 │         │     └── enquiryService.ts
 │         ├── store/              # Module Zustand slices
 │         │     └── enquirySlice.ts
 │         ├── types/              # Module-specific types/interfaces
 │         │     └── enquiryTypes.ts
 │         └── utils/              # Module-specific utilities
 │               └── enquiryUtils.ts
 │
 ├── App.tsx
 └── main.tsx

```

---

## 📛 Naming Conventions

Proper naming conventions help **maintain a consistent codebase**, make files easier to locate, and improve readability for anyone joining the project. Below is a detailed breakdown:

---

### 1️⃣ **Folder Naming**

All folders follows camelCase 

- **Convention:** `camelCase`, This applies to both `core` (shared resources) and `modules` (feature-specific folders).
- **Example:** `src/core/components`, `src/modules/enquiry/services`

---

### 1️⃣ **Service Files**

- **Convention:** `camelCase`  
- **Example:** `apiService.ts`, `enquiryService.ts`  
- **Location:** `src/modules/<moduleName>/services/`  
- **Purpose:** These files contain functions that interact with APIs or perform business logic.  
- **Reasoning:** Using camelCase differentiates services from React components (which use PascalCase).  

**Example:**  

`src/modules/enquiry/services/enquiryService.ts`
```ts
import { get, post, put } from '@core/utils/httpUtils';
import { API } from '@core/constants/endpoints';
import type { EnquiryDetail } from '../types/enquiryTypes';

/**
 * Fetch all enquiries
 */
const getEnquiries = async (): Promise<EnquiryDetail[]> => {
  try {
    const response = await get<EnquiryDetail[]>(API.ENQUIRY.BASE);
    return response;
  } catch (error) {
    console.error('Failed to fetch enquiries:', error);
    throw error;
  }
};

/**
 * Fetch a single enquiry by ID
 * @param id - enquiry identifier
 */
const getEnquiryById = async (id: number): Promise<EnquiryDetail> => {
  try {
    if (!id) throw new Error('Enquiry ID is required');
    const response = await get<EnquiryDetail>(API.ENQUIRY.byId(id));
    return response;
  } catch (error) {
    console.error(`Failed to fetch enquiry with id ${id}:`, error);
    throw error;
  }
};

/**
 * Save a new enquiry
 * @param payload - enquiry details to save
 */
const saveEnquiry = async (payload: EnquiryDetail): Promise<EnquiryDetail> => {
  try {
    if (!payload) throw new Error('Enquiry payload is required');
    const response = await post<EnquiryDetail>(API.ENQUIRY.BASE, payload);
    return response;
  } catch (error) {
    console.error('Failed to save enquiry:', error);
    throw error;
  }
};

/**
 * Update an existing enquiry
 * @param id - enquiry identifier
 * @param payload - enquiry details to update
 */
const updateEnquiry = async (id: number, payload: EnquiryDetail): Promise<EnquiryDetail> => {
  try {
    if (!id) throw new Error('Enquiry ID is required');
    if (!payload) throw new Error('Enquiry payload is required');
    const response = await put<EnquiryDetail>(API.ENQUIRY.byId(id), payload);
    return response;
  } catch (error) {
    console.error(`Failed to update enquiry with id ${id}:`, error);
    throw error;
  }
};

// Aggregate into a single service object
export const enquiryService = {
  getEnquiries,
  getEnquiryById,
  saveEnquiry,
  updateEnquiry,
};

```

---

### 2️⃣ **Module Components / Pages**

- **Convention:** `PascalCase` (first letter of each word capitalized)  
- **Examples:** `ButtonComponent.tsx`, `EnquiryPage.tsx`  
- **Location:**  
  - Module components: `src/modules/<moduleName>/components/`  
  - Module pages: `src/modules/<moduleName>/pages/`  
- **Purpose:** These are React components that define UI elements or page layouts.  
- **Reasoning:** PascalCase is standard for React components because JSX treats them as components vs HTML elements.

**Example Component:**  

`src/modules/enquiry/components/EnquiryForm.tsx`
```tsx
export function EnquiryForm() {
  return (
    <form>
      <input name="name" />
      <button type="submit">Submit</button>
    </form>
  );
}
```

**Example Page:**  

`src/modules/enquiry/pages/EnquiryPage.tsx`
```tsx
export function EnquiryPage() {
  return (
    <div>
      <h1>Enquiry Page</h1>
      <EnquiryForm />
    </div>
  );
}
```

---

### 3️⃣ **Component Name (React Component inside JSX)**

- **Convention:** `PascalCase`  
- **Example:** `<EnquiryForm />`, `<ButtonComponent />`  
- **Reasoning:** JSX requires component names to start with an uppercase letter so React can distinguish **custom components** from native HTML elements.  

---

### 4️⃣ **Regular Methods / Functions**

- **Convention:** `camelCase`  
- **Examples:** `fetchEnquiryData()`, `submitForm()`, `calculateTotal()`  
- **Location:** Can exist in services, components, or utilities.  
- **Purpose:** These are functions performing specific tasks, calculations, or API calls.  
- **Reasoning:** camelCase is the standard for JavaScript/TypeScript functions, differentiating them from React components.

**Example inside a component:**  

```tsx
export function EnquiryForm() {
  const handleSubmit = () => {
    console.log("Form submitted!");
  };

  return <button onClick={handleSubmit}>Submit</button>;
}
```

---

### ✅ Summary of Naming Conventions

| Type                       | Naming       | Example                        | Location                                           |
|-----------------------------|-------------|--------------------------------|----------------------------------------------------|
| Service File                | camelCase    | `enquiryService.ts`            | `src/modules/<moduleName>/services/`              |
| Module Component / Page     | PascalCase   | `EnquiryPage.tsx`              | `src/modules/<moduleName>/pages/` or `components/`|
| React Component (inside JSX)| PascalCase   | `<EnquiryForm />`              | Any component file                                |
| Regular Methods / Functions | camelCase    | `fetchEnquiryData()`           | Components, services, utils                       |
 

---

## 🧩 Components Example

File: `src/components/ButtonComponent.tsx`

```
import React from "react";

type ButtonProps = {
  label: string;
  onClick: () => void;
};

export function ButtonComponent({ label, onClick }: ButtonProps) {
  return <button onClick={onClick}>{label}</button>;
}
```

---

## 🌐 Service Example

File: `src/core/services/masterService.ts`

```
import { get } from '@core/utils/httpUtils';
import { useMasterDataStore } from '@core/store';
import logger from '@core/utils/loggerUtils';
import { API } from '@core/constants';
import type { Branch } from '@core/types';

/**
 * Fetches master data from the specified URL and updates the master data store.
 *
 * @param url - The endpoint URL to fetch the master data from.
 * @param stateName - The key or state name under which the fetched data will be stored in the master data store.
 * @returns A promise that resolves to an array of objects representing the fetched master data.
 */
const fetchMasterData = async <T extends object>(url: string, stateName: string): Promise<T[]> => {
  // Log the fetch action
  logger.info(`Fetching master data from ${url} for state "${stateName}"`);
  // Perform the GET request
  const response = await get<T[]>(url);
  // Update the master data store
  useMasterDataStore.getState().setData(stateName, response);
  return response;
};

/**
 * Fetches branches and stores them in master data store under the "branches" key.
 */
const getBranches = async (): Promise<Branch[]> => {
  // Fetch branches from the API
  const branches = await fetchMasterData<Branch>(API.BRANCHES, 'branches');
  return branches;
};

// Aggregate into a single service object
export const masterService = {
  getBranches,
};


```

---

## 🗂 Types Example

File: `src/types/apiTypes.ts`

```
export interface Enquiry {
  id: string;
  name: string;
  email: string;
}
```

---

## ⚙️ Path Imports for required modules

Declare required path imports in below file

File: `tsconfig.app.json`

```
{
  "compilerOptions": {
    ****
    "paths": {
      "@/*": ["*"],
      "@modules/*": ["modules/*"],
      "@types/*": ["types/*"]
    }
  }
}
```

Usage Example:

```
import { Enquiry } from "@types/apiTypes";
import { EnquiryForm } from "@modules/enquiry/components/EnquiryForm";
```

---

## 🏗 Module Example (Enquiry)

### Component

File: `src/modules/enquiry/components/EnquiryForm.tsx`

```
import React, { useState } from 'react';
import type { OptionType } from '@/types';
import BranchDropdown from './BranchDropdown';

const EnquiryForm: React.FC = () => {
  const [selectedValue, setSelectedValue] = useState<OptionType | null>(null);

  const handleAutocompleteChange = (value: OptionType | null) => {
    setSelectedValue(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    alert(`Submitted value: ${selectedValue}`);
  };

  const handleCancel = () => {
    setSelectedValue(null);
    // Additional cancel logic if needed
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Enquiry Form</h2>
      <div>
        <BranchDropdown value={selectedValue} onChange={handleAutocompleteChange} />
      </div>
      <div>
        <button type="submit">
          Submit
        </button>
        <button type="button" onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EnquiryForm;

```

### Page

File: `src/modules/enquiry/pages/EnquiryPage.tsx`

```
import React from 'react';
import EnquiryForm from '@modules/enquiry/components/EnquiryForm';
import logger from '@utils/logger';

const Enquiry: React.FC = () => {
  logger.info('Enquiry component rendered');

  return (
    <div>
      <h1>Enquiry</h1>
      <EnquiryForm />
    </div>
  );
};

export default Enquiry;

```

---

## 🔄 Zustand Store Example

Official Docs: https://zustand.docs.pmnd.rs/getting-started/introduction

File: `src/modules/enquiry/store/enquirySlice.ts`

### 1. Creating Independent store

```
import { create } from "zustand";

interface EnquiryState {
  enquiries: string[];
  addEnquiry: (enquiry: string) => void;
}

export const useEnquiryStore = create<EnquiryState>((set) => ({
  enquiries: [],
  addEnquiry: (enquiry) =>
    set((state) => ({ enquiries: [...state.enquiries, enquiry] })),
}));
```

Usage Example:

```
import { useEnquiryStore } from "@modules/enquiry/store/enquirySlice";

export function EnquiryList() {
  const { enquiries, addEnquiry } = useEnquiryStore();

  return (
    <div>
      <button onClick={() => addEnquiry("New enquiry")}>Add</button>
      <ul>
        {enquiries.map((e, i) => (
          <li key={i}>{e}</li>
        ))}
      </ul>
    </div>
  );
}
```

### 2. Creating Single store with multiple states

```
import type { StateCreator } from 'zustand';
import type { EnquirySlice } from '../types/enquiryTypes';

export const createEnquirySlice: StateCreator<EnquirySlice, [], [], EnquirySlice> = (set) => ({
  enquiry: null,
  setEnquiry: (enquiry) => set({ enquiry }),
});
```

Import all created slices in index.ts

```
import { create } from 'zustand';
import { createEnquirySlice } from './enquirySlice';
import type { EnquirySlice } from '../types/enquiryTypes';

// Add other slices here Eg: `EnquirySlice & OtherSlice`
type Store = EnquirySlice;

const useEnquiryStore = create<Store>((...a) => ({
  ...createEnquirySlice(...a),
  // Add other slices here
}));

export default useEnquiryStore;
```

---

## 🛣 Routing Example

File: `src/modules/enquiry/routes/index.tsx`

```
import type { RouteObject } from 'react-router-dom';
import Enquiry from '@modules/enquiry/pages/Enquiry';

const enquiryRoutes: Array<RouteObject> = [
  {
    path: 'enquiry',
    element: <Enquiry />,
  },
  // Add additional routes here for your module
];

export default enquiryRoutes;

```

Import all your module routes in main routes config

File: `src/routes/index.tsx`

```
import { type RouteObject } from 'react-router-dom';
import enquiryRoutes from '@modules/enquiry/routes';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <h1>Home Page</h1>,
  },
  ...enquiryRoutes,
  // Add your module routes here
];

export default routes;

```

---

## 🧪 Testing with Vitest

Official Docs: https://vitest.dev/

Add your test files in the same folder: `src/components/ButtonComponent.spec.tsx`

```
import { render, screen, fireEvent } from '@testing-library/react';
import BranchDropdown from './BranchDropdown';
import { vi, describe, beforeEach, it, expect } from 'vitest';

// Mock the zustand store
vi.mock('@/store', () => ({
  useMasterDataStore: vi.fn(),
}));

describe('BranchDropdown', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders with branches from the store', () => {
    render(<BranchDropdown value={mockBranches[0]} onChange={vi.fn()} />);
    const options = screen.getAllByTestId('option');
    expect(options).toHaveLength(mockBranches.length);
    expect(screen.getByTestId('selected').textContent).toBe(mockBranches[0].label);
  });
});

```

Run tests:

```
npm test
```
Run tests with coverage:

```
npm run test:cov
```

---

### ✅ Logger Usage

Import the logger in any component, module, or service:

```ts
import logger from '@utils/logger';

// Info log (only shows in development)
logger.info('Fetching user data', userId);

// debug log
logger.debug('It is working');

// Warning log
logger.warn('This might cause issues');

// Error log
logger.error('Failed to fetch data', error);
```

---
