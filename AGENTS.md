# AGENTS.md

## Stack

- Expo SDK 57 + React Native 0.86 + React 19
- UI: Gluestack UI (no custom Gluestack theme config — uses default)
- State: Zustand (`src/Theme/ThemeManager.ts`, `src/Store/AuthStore.ts`)
- Storage: AsyncStorage (token + theme persistence)
- Navigation: React Navigation native-stack + drawer
- Safe Area: react-native-safe-area-context
- TypeScript strict mode

## Architecture & Code Rules

- **MVVM (Model-View-ViewModel):** Arquitectura principal del proyecto.
- **Modular by Feature:** Las carpetas dividen el proyecto por módulos funcionales. Cada módulo contiene todo lo que necesita internamente (vistas, viewmodels, data/models).
- **ViewModels:** Aplica ViewModels por pantalla/módulo. Toda la lógica de negocio se concentra directamente en el ViewModel.
- **Tipado Estricto:** Absolutamente todo lo que se envía y recibe de la base de datos debe tener un modelo definido para potenciar el autocompletado de TypeScript.
- **Uso de ViewModels:** Cada pantalla tiene y usa su viewmodel específico.
- **Excepción de uso de use cases:** Únicamente se podrán usar en casos específicos consultando y planificando la implementación antes de tocar el código. Requiere aprobación explícita del usuario.

## Commands

```bash
npm start          # Expo dev server (web/android/ios)
npm run web        # Web only
npx tsc --noEmit   # Typecheck (no lint script configured)
```

No test suite, no linter, no formatter configured.

## Project Structure

```
App.tsx                    # Root navigator, auth logic, SafeAreaProvider
src/
  Theme/
    Colors.ts              # Light/Dark palettes (7 tokens each)
    ThemeManager.ts        # Zustand store: { color, isDark, onthemeChange, loadTheme }
  Store/
    AuthStore.ts           # Zustand store: { token, user, isAuthenticated, login, logout, checkAuth }
  Components/
    Header.tsx             # Global header with theme toggle + logout
  Screens/
    Login/
      Data/Models/User.ts  # User, CreateUserRequest, CreateUserResponse, LoginRequest, LoginResponse
      Login.tsx / LoginViewModel.ts
      Create.tsx / CreateViewModel.ts
      ForgotPassword.tsx / ForgotPassViewModel.ts
    Home/
      Data/Models/Product.ts   # Product, AdminProduct
      HomeAdmin/
        HomeAdmin.tsx / HomeAdminViewModel.ts
        UsersSection.tsx
        InventorySection.tsx
      HomeUser/
        HomeUser.tsx / HomeUserViewModel.ts
        DashboardSection.tsx
        ProductsSection.tsx
    Products/
      Data/Models/Product.ts
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
- Form cards use shadow: `style={{ shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.08, shadowRadius: 3, elevation: 2 }}`

### Multiplatform (Mobile + Web)
- All screens must wrap root content with `<SafeAreaView>` from `react-native-safe-area-context`
- Auth screens: `SafeAreaView` with `style={{ flex: 1, backgroundColor: color.background }}`
- Home screens (in App.tsx): `SafeAreaView edges={["top"]}` with `style={{ flex: 1, backgroundColor: color.surface }}`
- Always use `useWindowDimensions()` + `isWideScreen = width >= 768` for responsive layout
- All form inputs use `keyboardType="numeric"` for numeric fields
- Use `.trim()` on all text inputs before sending to backend
- Price inputs use prefix pattern: `[$ | price]`, `[Bs | price]`, `[€ | price]`
- Forms in modals for mobile: `<Modal size="full">` with `maxHeight: "85%"`
- Forms side-by-side on web: `<Modal size="lg">`

### Layout
- Auth screens use side-by-side layout on wide screens (image 40% / form 60%)
- Image container: `flex={2}`, centered with `alignItems="center" justifyContent="center"`
- Form container: `flex={3}`, card with `maxWidth="$96"` on web
- All auth screens include `ScrollView` for overflow protection

### Naming Conventions (REGLA INQUEBRANTABLE)
- **PROHIBIDO:** letras sueltas (`a`, `b`, `x`, `d`, `e`), abreviaturas (`usr`, `adm`, `p`, `qty`), nombres genéricos (`data`, `result`, `item`, `obj`, `temp`, `val`)
- **OBLIGATORIO:** nombres descriptivos en español que indiquen QUÉ es y PARA QUÉ sirve
- Todo `const`, `let`, parámetro de función y variable de estado debe ser legible sin contexto adicional

```
❌ Prohibido                          ✅ Correcto
const a = ...                         const usuarioEnBD = ...
const d = await axios.get(...)        const respuestaEmpleados = await axios.get(...)
const x = usuarios.filter(...)        const usuariosDisponibles = usuarios.filter(...)
setError(e)                           setError("Error al cargar empleados")
catch (err)                           catch (errorCargaEmpleados)
```

### File Naming
- Screens: PascalCase (`Login.tsx`, `Create.tsx`)
- Note: `Producst.tsx` has a typo — products screen filename

### Drawer Navigation
- `drawerStyle: { width: 280 }`
- `drawerLabelStyle: { fontSize: 16, fontWeight: "600", marginLeft: -4 }`
- `drawerActiveBackgroundColor: color.primary + "15"`

### Backend (NestJS + TypeORM)
- **Relaciones:** Usar decorators reales (`@ManyToOne`, `@OneToMany`, `@OneToOne`), NUNCA `simple-json` para relaciones entre entidades
- **Self-referencing:** Cuando una entity se relaciona consigo misma (User → User), usar `@JoinColumn({ name: 'foreignId' })` + `@Column({ nullable: true })` para la FK explícita
- `synchronize: true` genera tablas y columnas automáticamente
- **Variable naming:** Aplica las mismas reglas de Naming Conventions — variables descriptivas en español

## Working Pattern (MVVM)

### Model (`Data/Models/*.ts`)
- Interfaces para: Request, Response, Entity
- Ubicación: `src/Screens/[Screen]/Data/Models/[Model].ts`
- El modelo User debe ser idéntico al CreateUserRequest (mismos campos)

### View (`[Screen].tsx`)
- Solo UI — importa y consume el viewmodel
- Usa `const viewmodel = use[Screen]ViewModel()`
- Accede a state: `viewmodel.nombre`, `viewmodel.loading`, `viewmodel.error`
- Accede a setters: `viewmodel.setNombre`, `viewmodel.setCorreo`
- Accede a acciones: `viewmodel.submit()`
- No contiene lógica de negocio

### ViewModel (`[Screen]ViewModel.ts`)
```
Custom Hook que sigue este patrón:
1. State del formulario (useState por campo)
2. State de UI (loading, error)
3. submit = async () => { ... }
4. Return: state + setters + submit
```

**Reglas del ViewModel:**
- Variable se llama `viewmodel` (no `vm`)
- Servicio HTTP DENTRO del ViewModel (no archivo separado)
- Validaciones DENTRO de `submit` con if simples
- No funciones de validación separadas
- API URL desde variable de entorno: `process.env.EXPO_PUBLIC_API_URL`
- Usar `const` con async/await para funciones de negocio
- Usar variables trimmed antes de enviar al backend: `const usuarioTrimmed = usuario.trim()`
- **PROHIBIDO:** `axios`, `fetch` o cualquier llamada HTTP en archivos `.tsx` (vistas). Todo HTTP va DENTRO del ViewModel

**Patrón de submit:**
```typescript
const submit = async (): Promise<Response | null> => {
  // Validaciones con if simples
  if (!campo) { setError("msg"); return null; }
  
  // Variables trimmed para backend
  const campoTrimmed = campo.trim();
  
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
```

## Known Issues

- No Google Sign-In integration (button removed from scope)
- React Native DevTools may fail on Linux (Chromium sandbox issue) — use `npx expo start` without DevTools
