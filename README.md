# FreshPrep - GitHub Users Explorer

A modern React Native mobile application built with Expo that allows users to explore GitHub users, view their repositories, and manage favorites with smooth animations and optimal performance.

## 🚀 What is the project about?

FreshPrep is a GitHub users explorer app that provides a seamless experience for discovering developers, viewing their repositories, and managing a personal favorites list. The app demonstrates modern mobile development practices with React Native, TypeScript, and advanced state management.

## ✨ Main Features

### Core Functionality
- **📱 Paginated User Discovery** - Browse GitHub users with infinite scroll pagination
- **🔍 Smart Search** - Real-time search and filtering capabilities
- **⭐ Favorites Management** - Add/remove users from favorites with optimistic updates
- **📊 User Details** - Comprehensive user profiles with repository statistics
- **📱 Pull-to-Refresh** - Intuitive data refresh experience

### Advanced Features
- **⚡ Optimistic Updates** - Instant UI feedback with rollback on failure
- **🔄 Smart Caching** - Intelligent data caching with React Query
- **📈 Performance Optimized** - Smooth animations and efficient rendering
- **🎯 Type Safety** - Full TypeScript implementation
- **📱 Responsive Design** - Optimized for all screen sizes

## 🎯 Technologies Used

### Core Framework
- **React Native** - Cross-platform mobile development
- **Expo** - Development platform and build tools
- **TypeScript** - Type-safe JavaScript development

### State Management & Data Fetching
- **TanStack Query (React Query)** - Server state management and caching
- **Redux Toolkit** - Client state management for favorites
- **AsyncStorage** - Local data persistence

### UI & Styling
- **Expo Router** - File-based navigation
- **React Native Reanimated** - Smooth animations
- **Custom Design System** - Consistent theming and components

### Development Tools
- **ESLint** - Code linting and formatting
- **Jest** - Unit testing framework
- **Metro** - JavaScript bundler

## 🚀 How to Run the Project

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator or Android Emulator (optional)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/luizfelipefalcao/freshprep
   cd freshprep
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Add your GitHub API token to .env.local
   EXPO_PUBLIC_GITHUB_TOKEN=your_github_token_here
   ```

4. **Start the development server**
   ```bash
   npx expo start
   # or
   npm start
   ```

5. **Run on device/simulator**
   - Scan QR code with Expo Go app
   - Press `i` for iOS simulator
   - Press `a` for Android emulator

## 🐳 Docker Configuration

The project includes a `docker-compose.yml` file for containerized development:

```yaml
version: '3.8'
services:
  freshprep:
    build: .
    ports:
      - "8081:8081"
    volumes:
      - .:/app
      - /app/node_modules
    environment:
      - EXPO_PUBLIC_GITHUB_TOKEN=${GITHUB_TOKEN}
      - EXPO_PUBLIC_API_BASE_URL=${GITHUB_API}
```

### Docker Benefits
- **Consistent Environment** - Same development setup across all machines
- **Easy Onboarding** - New developers can start with `docker-compose up`
- **Isolated Dependencies** - No conflicts with local Node.js versions
- **Production-like Setup** - Mirrors production deployment environment

## 📁 Project Structure

```
freshprep/
├── app/                          # Expo Router pages
│   └── (tabs)/                   # Tab navigation
│       ├── index.tsx            # Home screen
│       ├── favourites.tsx       # Favorites screen
│       └── _layout.tsx          # Tab layout
├── src/
│   ├── api/                     # API layer
│   │   ├── client/             # HTTP client configuration
│   │   ├── endpoints/          # API endpoint definitions
│   │   ├── services/           # Service layer
│   │   └── types/              # TypeScript type definitions
│   ├── components/             # Reusable UI components
│   │   ├── Card/               # Card components
│   │   ├── Header/             # Header component
│   │   ├── Loading/            # Loading states
│   │   ├── primitives/         # Basic UI primitives
│   │   └── ui/                 # Complex UI components
│   ├── context/                # React Context providers
│   │   └── ThemeContext/       # Theme management
│   ├── hooks/                  # Custom React hooks
│   │   ├── useFavouriteUsers/  # Favorites management
│   │   ├── usePaginatedUsers/  # Pagination logic
│   │   └── useUserFollowers/   # User Followers fetching
│   │   └── useUserFollowing/   # User Following fetching
│   │   └── useUserRepos/       # Repository fetching
│   │   └── useVerifyNetworkStatus/ # Network verification along the navigation tabs
│   ├── navigation/             # Navigation configuration
│   ├── providers/              # App providers
│   ├── screens/                # Screen components
│   │   ├── DetailsScreen/      # User details
│   │   ├── FavouriteScreen/    # Favorites list
│   │   └── HomeScreen/         # Main user list
│   ├── store/                  # Redux store
│   │   └── slicers/            # Redux slices
│   ├── theme/                  # Theme configuration
│   └── utils/                  # Utility functions
├── docker-compose.yml          # Docker configuration
├── app.json                    # Expo configuration
├── package.json                # Dependencies
└── tsconfig.json              # TypeScript configuration
```

## 🔄 React Query Implementation

### Query Configuration
```typescript
// QueryClient setup with optimal defaults
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,    // 5 minutes
      gcTime: 10 * 60 * 1000,      // 10 minutes
      retry: 3,
      refetchOnWindowFocus: false,
    },
  },
});
```

### Custom Hooks Architecture

#### 1. **usePaginatedUsers** - Infinite Scroll
```typescript
export const usePaginatedUsers = () => {
  return useInfiniteQuery({
    queryKey: ['users'],
    queryFn: ({ pageParam = 1 }) => UserService.getUsers(pageParam),
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 1,
  });
};
```

#### 2. **useFavouriteUsers** - Smart Caching
```typescript
export const useFavouriteUsers = () => {
  const favouriteIds = useSelector(state => state.favourites.favouriteId);
  
  return useQuery({
    queryKey: ['favourites', favouriteIds],
    queryFn: async () => {
      // Combine cached data with API fetches
      const cachedUsers = getCachedUsers(favouriteIds);
      const missingUsers = await fetchMissingUsers(favouriteIds);
      return [...cachedUsers, ...missingUsers];
    },
  });
};
```

#### 3. **useUserRepos** - Individual Data Fetching
```typescript
export const useUserRepos = (username: string) => {
  return useQuery({
    queryKey: ['userRepos', username],
    queryFn: () => UserService.getUserRepos(username),
    enabled: !!username,
  });
};
```

### Cache Invalidation Strategy
- **Automatic Invalidation** - Query keys change when dependencies update
- **Manual Invalidation** - Strategic cache clearing after mutations
- **Optimistic Updates** - Immediate UI updates with rollback capability

## 🎯 Requirements Implementation

### ✅ Level 1: Basic Mobile Client
- **Home Screen** ✅
  - Paginated GitHub users list with infinite scroll
  - Loading states with animations
  - Error handling with retry mechanisms
  - Pull-to-refresh functionality
  - React Query for all data fetching

- **Details Screen** ✅
  - Navigation from list items
  - Extended user information display
  - Repository statistics and details
  - Interactive repository cards

### ✅ Level 2: Query Caching & Search
- **React Query Caching** ✅
  - In-memory caching while app is running
  - Configurable stale time and garbage collection
  - Automatic background refetching

- **Search Functionality** ✅
  - Real-time search with debouncing
  - Filter users by username
  - Maintains pagination during search

### ✅ Level 3: Favorites with Optimistic Updates
- **Favorites Tab** ✅
  - Dedicated favorites screen
  - Smooth navigation between tabs

- **Storage Pattern** ✅
  - Store only user IDs in Redux store
  - Map IDs to full data from Home screen cache
  - Fetch missing users from API when needed

- **Optimistic Updates** ✅
  - Immediate UI updates when toggling favorites
  - Rollback mechanism on failure
  - Smooth loading states during updates

- **Query Synchronization** ✅
  - Automatic invalidation after mutations
  - All components stay in sync
  - Efficient cache management

## 🏆 Best Practices & Code Quality

### Code Organization
- **Modular Architecture** - Clear separation of concerns
- **Custom Hooks** - Reusable logic extraction
- **Type Safety** - Comprehensive TypeScript implementation
- **Component Composition** - Small, focused components

### Performance Optimizations
- **Memoization** - Strategic use of useMemo and useCallback
- **Lazy Loading** - Components loaded on demand
- **Image Optimization** - Efficient image handling

### User Experience
- **Loading States** - Progress indicators
- **Error Boundaries** - Graceful error handling
- **Accessibility** - Screen reader support and proper labeling

### Testing & Quality
- **Unit Tests** - Jest testing for critical functions
- **Type Checking** - Strict TypeScript configuration
- **Linting** - ESLint for code quality
- **Code Reviews** - Consistent code review process

## Get started

1. Initialyzing via Docker

   ```bash
   docker compose up --build
   or yarn run docker:start
   ```

2. Initialyzing via expo

   ```bash
   yarn run start
   or npm run start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.

---

**Built with ❤️ using React Native, TypeScript, and modern mobile development practices.**
