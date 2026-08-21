# AGENTS.md

## Stack

- Expo SDK 57 + React Native 0.86 + React 19
- UI: Gluestack UI (no custom Gluestack theme config — uses default)
- State: Zustand (`src/Theme/ThemeManager.ts`)
- Navigation: React Navigation native-stack
- TypeScript strict mode

## Architecture & Code Rules

- **Modular by Feature:** Las carpetas dividen el proyecto por módulos funcionales. Cada módulo contiene todo lo que necesita internamente (vistas, viewmodels, data/models).
- **ViewModels:** Aplica ViewModels por pantalla/módulo. Toda la lógica de negocio se concentra directamente en el ViewModel (sin usar casos de uso separados).
- **Tipado Estricto:** Absolutamente todo lo que se envía y recibe de la base de datos debe tener un modelo definido para potenciar el autocompletado de TypeScript.
- **Uso de ViewModels:** cada panatalla tiene y usa su viewmodel especifico
- **Excepcion de uso de use cases:** Unicamente se podran usar en casos especificos consultando y planificando la implementacion antes de tocar el codigo solo en casos especificos

## Commands

```bash
npm start          # Expo dev server (web/android/ios)
npm run web        # Web only
npx tsc --noEmit   # Typecheck (no lint script configured)
```

No test suite, no linter, no formatter configured.

## Project Structure

```
App.tsx                    # Root navigator, 5 screens
src/
  Theme/
    Colors.ts              # Light/Dark palettes (7 tokens each)
    ThemeManager.ts        # Zustand store: { color, isDark, onthemeChange }
  Screens/
    Login/
     Data/Models/User.ts   # User, CreateUserRequest, CreateUserResponse
     Login.tsx  
     LoginViewModel.ts     
     Create.tsx
     CreateViewModel.ts       
     ForgotPassword.tsx
     ForgotPassViewModel.ts
    Home/
     Data/
      Models/     #(Se van a implemnetar)
     HomeAdmin/
      HomeAdmin.tsx
      HomeAdminViewmodel.ts
     HomeUSer/
      HomeUSer.tsx
      HomeUSerViewModel        
    Products/
     Data/
      Models/
     Producst.tsx
     ProductsViewmodel.ts
    Componets/  
     Header.tsx            
  sources/Images/         
```
## Conventions

### Theme System
- Always use `color.*` tokens from `useAppTheme()` — never hardcode hex values
- Default theme is dark (`isDark: true` in store)
- Toggle via `onthemeChange()` from the Zustand store
- Available tokens: `background`, `surface`, `primary`, `accent`, `textPrimary`, `textSecondary`, `border`

### Component Patterns
- Input size is always `size="md"` (not xl, not lg)
- Button size is always `size="md"`
- Card pattern: `<Box bg={color.surface} borderRadius="$xl" borderWidth={1} borderColor={color.border}>`
- Input pattern: `<Input variant="outline" size="md" borderRadius={10} borderColor={color.primary}>`
- Responsive: use `useWindowDimensions()` + `isWideScreen = width >= 768` breakpoint

### Layout
- Auth screens use side-by-side layout on wide screens (image 40% / form 60%)
- Image container: `flex={2}`, centered with `alignItems="center" justifyContent="center"`
- Form container: `flex={3}`, card with `maxWidth="$96"` on web
- All auth screens include `ScrollView` for overflow protection

### File Naming
- Screens: PascalCase (`Login.tsx`, `Create.tsx`)
- Note: `Producst.tsx` has a typo — products screen filename

## Working Pattern

### ViewModel Structure (Custom Hook)
Cada pantalla/módulo tiene su ViewModel como Custom Hook que sigue este patrón:

```typescript
// Nombre: [Screen]ViewModel.ts
// Ubicación: junto al archivo de la pantalla

export function use[Screen]ViewModel() {
  // 1. State del formulario (useState)
  // 2. State de UI (loading, error)
  // 3. Funciones de negocio (const con async/await)
  // 4. Servicio HTTP (dentro del ViewModel, no separado)
  // 5. Validaciones (dentro de submit, no funciones separadas)
  
  const submit = async () => {
    // Validaciones con if simples
    if (!campo) { setError("msg"); return null; }
    
    // Llamada al backend
    setLoading(true);
    try {
      const response = await axios.post(...);
      return response.data;
    } catch (err) {
      setError("msg");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { /* state, setters, submit */ };
}
```

### Model Structure
- Ubicación: `src/Screens/[Screen]/Data/Models/[Model].ts`
- Interfaces para: Request, Response, Entity
- El modelo User debe ser idéntico al CreateUserRequest (mismos campos)

### Validation Pattern
- Todas las validaciones se hacen DENTRO de `submit` con if simples
- No funciones de validación separadas
- Cada campo se valida con un if: `if (!campo) { setError("msg"); return null; }`
- Email: debe contener `@` y terminar en `.com`
- Password: mínimo 6 caracteres

### HTTP Service
- El servicio HTTP va DENTRO del ViewModel (no archivo separado)
- Usar `const` con async/await: `const createUser = async (data) => { ... }`
- API URL desde variable de entorno: `process.env.EXPO_PUBLIC_API_URL`
- Rutas del backend: `/auth/create`, `/auth/login`, etc.

## Known Issues

- No Google Sign-In integration (button removed from scope)
- No backend integration — frontend-only for now
- Home and Products screens are empty stubs
- React Native DevTools may fail on Linux (Chromium sandbox issue) — use `npx expo start` without DevTools
