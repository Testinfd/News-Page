Run npm run build

> sports-news-app@0.1.0 build
> react-scripts build

Creating an optimized production build...
Failed to compile.

TS2769: No overload matches this call.
  Overload 1 of 2, '(props: { component: ElementType<any, keyof IntrinsicElements>; } & GridBaseProps & { sx?: SxProps<Theme> | undefined; } & SystemProps<...> & Omit<...>): Element | null', gave the following error.
    Property 'component' is missing in type '{ children: Element; key: string; item: true; xs: number; sm: number; md: number; }' but required in type '{ component: ElementType<any, keyof IntrinsicElements>; }'.
  Overload 2 of 2, '(props: DefaultComponentProps<GridTypeMap<{}, "div">>): Element | null', gave the following error.
    Type '{ children: Element; key: string; item: true; xs: number; sm: number; md: number; }' is not assignable to type 'IntrinsicAttributes & GridBaseProps & { sx?: SxProps<Theme> | undefined; } & SystemProps<Theme> & Omit<...>'.
      Property 'item' does not exist on type 'IntrinsicAttributes & GridBaseProps & { sx?: SxProps<Theme> | undefined; } & SystemProps<Theme> & Omit<...>'.
     95 |         <Grid container spacing={3} justifyContent="center">
     96 |           {articles.map((article) => (
  >  97 |             <Grid key={article.id} item xs={12} sm={6} md={4}>
        |             ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
     98 |               <ArticleCard
     99 |                 id={article.id}
    100 |                 title={article.title}


Error: Process completed with exit code 1.