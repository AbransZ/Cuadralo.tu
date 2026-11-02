# AGENTS.md

## Stack

- Expo SDK 57 + React Native 0.86 + React 19
- UI: Gluestack UI (sin configuración de tema personalizada — usa la de por defecto)
- Estado: Zustand (`src/Theme/ThemeManager.ts`, `src/Store/AuthStore.ts`)
- Almacenamiento: AsyncStorage (persistencia de token + tema)
- Navegación: React Navigation native-stack + drawer
- Safe Area: react-native-safe-area-context
- TypeScript en modo estricto

## Arquitectura y Reglas de Código

- **MVVM (Model-View-ViewModel):** Arquitectura principal del proyecto.
- **Modular por Funcionalidad:** Las carpetas dividen el proyecto por módulos funcionales. Cada módulo contiene todo lo que necesita internamente (vistas, viewmodels, data/models).
- **ViewModels:** Aplica ViewModels por pantalla/módulo. Toda la lógica de negocio se concentra directamente en el ViewModel.
- **Tipado Estricto:** Absolutamente todo lo que se envía y recibe de la base de datos debe tener un modelo definido para potenciar el autocompletado de TypeScript.
- **Uso de ViewModels:** Cada pantalla tiene y usa su viewmodel específico.
- **Excepción de uso de use cases:** Únicamente se podrán usar en casos específicos consultando y planificando la implementación antes de tocar el código. Requiere aprobación explícita del usuario.

## Comandos

```bash
npm start          # Servidor de desarrollo de Expo (web/android/ios)
npm run web        # Solo web
npx tsc --noEmit   # Verificación de tipos (no hay script de lint configurado)
```

No hay suite de tests, ni linter, ni formateador configurados.

## Estructura del Proyecto

```
App.tsx                    # Navegador raíz, lógica de autenticación, SafeAreaProvider
src/
  Theme/
    Colors.ts              # Paletas claro/oscuro (7 tokens cada una)
    ThemeManager.ts        # Store de Zustand: { color, isDark, onthemeChange, loadTheme }
  Store/
    AuthStore.ts           # Store de Zustand: { token, user, isAuthenticated, login, logout, checkAuth }
  Components/
    Header.tsx             # Encabezado global con cambio de tema + cerrar sesión
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

## Convenciones

### Sistema de Temas
- Usar siempre los tokens de `color.*` desde `useAppTheme()` — nunca escribir valores hex directamente
- El tema por defecto es oscuro (`isDark: true` en el store)
- Cambiar mediante `onthemeChange()` del store de Zustand
- Tokens disponibles: `background`, `surface`, `primary`, `accent`, `textPrimary`, `textSecondary`, `border`

### Patrones de Componentes
- El tamaño de los Input es siempre `size="md"` (ni xl, ni lg)
- El tamaño de los Button es siempre `size="md"`
- Patrón de tarjeta: `<Box bg={color.surface} borderRadius="$xl" borderWidth={1} borderColor={color.border}>`
- Patrón de input: `<Input variant="outline" size="md" borderRadius={10} borderColor={color.primary}>`
- Las tarjetas de formulario usan sombra: `style={{ shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.08, shadowRadius: 3, elevation: 2 }}`

### Multiplataforma (Móvil + Web)
- Todas las pantallas deben envolver el contenido raíz con `<SafeAreaView>` de `react-native-safe-area-context`
- Pantallas de autenticación: `SafeAreaView` con `style={{ flex: 1, backgroundColor: color.background }}`
- Pantallas de inicio (en App.tsx): `SafeAreaView edges={["top"]}` con `style={{ flex: 1, backgroundColor: color.surface }}`
- Usar siempre `useWindowDimensions()` + `isWideScreen = width >= 768` para el diseño responsivo
- Todos los inputs de formulario usan `keyboardType="numeric"` para campos numéricos
- Usar `.trim()` en todos los inputs de texto antes de enviarlos al backend
- Los inputs de precio usan patrón de prefijo: `[$ | precio]`, `[Bs | precio]`, `[€ | precio]`
- Formularios en modales para móvil: `<Modal size="full">` con `maxHeight: "85%"`
- Formularios lado a lado en web: `<Modal size="lg">`

### Diseño de Pantallas
- Las pantallas de autenticación usan diseño lado a lado en pantallas anchas (imagen 40% / formulario 60%)
- Contenedor de imagen: `flex={2}`, centrado con `alignItems="center" justifyContent="center"`
- Contenedor del formulario: `flex={3}`, tarjeta con `maxWidth="$96"` en web
- Todas las pantallas de autenticación incluyen `ScrollView` para protección ante desbordamiento

### Convenciones de Nombres (REGLA INQUEBRANTABLE)
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

### Estilo de Programación y Desarrollo
- **Principio KISS:** Código simple y directo, sin complejidad innecesaria
- **Esfuerzo mínimo:** La solución más simple que funciona es la mejor
- **Legibilidad sobre brevedad:** Código fácil de entender siempre que sobre rendimiento o acortamientos
- **Control flow explícito:** Preferir `if/else` sobre operadores ternarios encadenados o lógica compleja en una línea
- **Manejo de errores:** Usar `try/catch` claro y directo, evitando patrones de error complejos o "magia"
- **Funciones simples:** Funciones pequeñas y específicas, sin lógica oculta o composiciones innecesarias de librerías
- **Sin abstracciones innecesarias:** Evitar librerías o utilidades que encapacultan lo básico; si una operación es simple (formato, validación, transformación), hacerlo inline o con funciones propias de unas pocas líneas
- **Explicación de funcionamiento:** Siempre que se use una función o patrón que no sea obvio, incluir un comentario breve indicando qué hace y cómo funciona
- **Variables trimmed:** Aplicar `.trim()` en todos los inputs de texto antes de enviarlos al backend
- **Preferir sintaxis nativa:** Usar características nativas de JavaScript/TypeScript antes que dependencias externas para tareas simples
- `drawerLabelStyle: { fontSize: 16, fontWeight: "600", marginLeft: -4 }`
- `drawerActiveBackgroundColor: color.primary + "15"`

### Backend (NestJS + TypeORM)
- **Relaciones:** Usar decorators reales (`@ManyToOne`, `@OneToMany`, `@OneToOne`), NUNCA `simple-json` para relaciones entre entidades
- **Self-referencing:** Cuando una entity se relaciona consigo misma (User → User), usar `@JoinColumn({ name: 'foreignId' })` + `@Column({ nullable: true })` para la FK explícita
- `synchronize: true` genera tablas y columnas automáticamente
- **Variable naming:** Aplica las mismas reglas de Naming Conventions — variables descriptivas en español

## Patrón de Trabajo (MVVM)

### Modelo (`Data/Models/*.ts`)
- Interfaces para: Request, Response, Entity
- Ubicación: `src/Screens/[Screen]/Data/Models/[Model].ts`
- El modelo User debe ser idéntico al CreateUserRequest (mismos campos)

### Vista (`[Screen].tsx`)
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
- La variable se llama `viewmodel` (no `vm`)
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

## Problemas Conocidos

- Sin integración de Google Sign-In (botón eliminado del alcance)
- React Native DevTools puede fallar en Linux (problema de sandbox de Chromium) — usar `npx expo start` sin DevTools
