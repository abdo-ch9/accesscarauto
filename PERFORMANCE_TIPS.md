# ⚡ Performance Tips & Best Practices

## Quick Wins Already Applied ✅

1. **Code Splitting** - Routes are lazy loaded
2. **Memoization** - Functions and values are memoized
3. **Type Safety** - Strict TypeScript types
4. **Clean Code** - Removed console logs and unused code

---

## Additional Optimization Tips

### React Component Optimization

#### 1. Use React.memo() for Heavy Components
```typescript
// Before
const HeavyComponent = ({ data }) => {
  // ... expensive rendering
};

// After
const HeavyComponent = React.memo(({ data }) => {
  // ... expensive rendering
}, (prevProps, nextProps) => {
  return prevProps.data === nextProps.data; // Custom comparison
});
```

#### 2. Virtualize Long Lists
```bash
npm install react-window
```

```typescript
import { FixedSizeList } from 'react-window';

<FixedSizeList
  height={600}
  itemCount={products.length}
  itemSize={100}
  width="100%"
>
  {({ index, style }) => (
    <div style={style}>{products[index]}</div>
  )}
</FixedSizeList>
```

#### 3. Debounce Search Inputs
```typescript
import { useMemo } from 'react';
import debounce from 'lodash/debounce';

const debouncedSearch = useMemo(
  () => debounce((value) => {
    // API call here
  }, 300),
  []
);
```

---

### Image Optimization

#### 1. Lazy Load Images
```typescript
// Add to index.css
img[loading="lazy"] {
  opacity: 0;
  transition: opacity 0.3s;
}

img[loading="lazy"].loaded {
  opacity: 1;
}
```

```typescript
<img 
  src="/path/to/image.jpg" 
  loading="lazy" 
  alt="Description"
  onLoad={(e) => e.target.classList.add('loaded')}
/>
```

#### 2. Use WebP Format
```typescript
<picture>
  <source srcSet="/image.webp" type="image/webp" />
  <source srcSet="/image.jpg" type="image/jpeg" />
  <img src="/image.jpg" alt="Fallback" />
</picture>
```

#### 3. Optimize Image Sizes
```bash
# Install imagemin
npm install imagemin imagemin-webp imagemin-mozjpeg
```

---

### API & Network Optimization

#### 1. React Query Configuration
```typescript
// Optimize React Query settings
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      cacheTime: 1000 * 60 * 30, // 30 minutes
      retry: 2,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
  },
});
```

#### 2. Request Batching
```typescript
// Group multiple API calls
const fetchMultiple = async (ids: string[]) => {
  const results = await Promise.all(
    ids.map(id => fetch(`/api/item/${id}`))
  );
  return Promise.all(results.map(r => r.json()));
};
```

#### 3. Prefetch Data
```typescript
// Prefetch on hover
const handleMouseEnter = () => {
  queryClient.prefetchQuery(['product', id], fetchProduct);
};

<Link to="/product/123" onMouseEnter={handleMouseEnter}>
  Product
</Link>
```

---

### Bundle Size Optimization

#### 1. Analyze Bundle
```bash
# Build with analysis
npm run build -- --report

# Or use webpack-bundle-analyzer
npm install -D webpack-bundle-analyzer
```

#### 2. Tree Shaking
```typescript
// ❌ Bad - imports entire library
import _ from 'lodash';

// ✅ Good - imports only what you need
import debounce from 'lodash/debounce';
```

#### 3. Dynamic Imports
```typescript
// Load heavy libraries only when needed
const loadPDF = async () => {
  const pdfLib = await import('pdf-lib');
  // Use pdfLib
};
```

---

### Caching Strategies

#### 1. Service Worker (PWA)
```bash
npm install -D vite-plugin-pwa
```

```typescript
// vite.config.ts
import { VitePWA } from 'vite-plugin-pwa';

export default {
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}']
      }
    })
  ]
};
```

#### 2. HTTP Cache Headers
```typescript
// Set in your API responses
{
  'Cache-Control': 'max-age=3600', // 1 hour
  'ETag': 'version-123'
}
```

---

### CSS Optimization

#### 1. Critical CSS
```bash
npm install -D critters
```

#### 2. Purge Unused CSS
```typescript
// tailwind.config.ts
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  // This will remove unused Tailwind classes
};
```

#### 3. CSS-in-JS Optimization
```typescript
// Use CSS modules for better performance
import styles from './Component.module.css';

<div className={styles.container}>...</div>
```

---

### Development vs Production

#### Development Mode
```bash
# Fast refresh
# Source maps
# Verbose errors
npm run dev
```

#### Production Mode
```bash
# Minification
# Tree shaking
# Code splitting
npm run build
```

---

### Monitoring & Analytics

#### 1. Web Vitals
```bash
npm install web-vitals
```

```typescript
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

getCLS(console.log);
getFID(console.log);
getFCP(console.log);
getLCP(console.log);
getTTFB(console.log);
```

#### 2. React DevTools Profiler
```typescript
import { Profiler } from 'react';

<Profiler id="MyComponent" onRender={onRenderCallback}>
  <MyComponent />
</Profiler>
```

---

## Performance Checklist

### Before Deployment
- [ ] Run production build
- [ ] Check bundle size (< 500KB)
- [ ] Run Lighthouse audit (score > 90)
- [ ] Test on slow 3G network
- [ ] Check mobile performance
- [ ] Verify all images are optimized
- [ ] Enable compression (gzip/brotli)
- [ ] Set up CDN for static assets
- [ ] Configure cache headers
- [ ] Test with React DevTools Profiler

### After Deployment
- [ ] Monitor Core Web Vitals
- [ ] Track bundle size over time
- [ ] Monitor error rates
- [ ] Check real user metrics
- [ ] A/B test performance improvements

---

## Common Performance Anti-Patterns to Avoid

### ❌ Don't
```typescript
// Inline object creation (causes re-renders)
<Component style={{ margin: 10 }} />

// Anonymous functions in render
<button onClick={() => handleClick()}>Click</button>

// Unnecessary state
const [count, setCount] = useState(props.count); // Redundant

// Large bundle imports
import moment from 'moment'; // 67KB!
```

### ✅ Do
```typescript
// Memoized objects
const style = useMemo(() => ({ margin: 10 }), []);
<Component style={style} />

// Stable function references
const handleClick = useCallback(() => { ... }, []);
<button onClick={handleClick}>Click</button>

// Use props directly
const count = props.count;

// Smaller alternatives
import dayjs from 'dayjs'; // 2KB!
```

---

## Resources

- [React Performance Optimization](https://react.dev/learn/render-and-commit)
- [Web.dev Performance](https://web.dev/performance/)
- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)
- [Bundle Phobia](https://bundlephobia.com/) - Check package sizes
- [Can I Use](https://caniuse.com/) - Browser compatibility

---

Happy optimizing! 🚀

