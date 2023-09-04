import React, { useEffect } from 'react';
import { Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppSelector } from '../../hooks/useAppSelector';
import CategoriesView from '../../components/CategoriesView/CategoriesView';
import { Box, Container } from '@mui/system';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import CatalogBreadcrumbs from '../../components/CatalogBreadcrumbs/CatalogBreadcrumbs';
import ProductListView from '../../components/ProductListView/ProductListView';
import { siteLocale } from '../../api/BuildClient';

export function CategoryPage() {
  const { categories, error, loading } = useAppSelector((state) => state.categoriesReducer);
  const params = useParams<'id'>();
  const navigate = useNavigate();
  const [drawlerState, setDrawlerState] = React.useState(false);

  const isCatalogMain = !params.id;
  const category = params.id ? categories.find((c) => c.slug[siteLocale] === params.id) : undefined;
  const hasChild = category ? categories.some((c) => c.parent?.id === category.id) : undefined;

  useEffect(() => {
    // console.log('CategoryPage useEffect params.id: ', params.id);
    if (!loading && !category && !isCatalogMain) navigate('/404', { replace: true });
  }, [params, loading]);

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (event && event.type === 'keydown' && ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')) return;
    setDrawlerState(open);
  };

  const CategoryList = () => {
    return (
      <Container
        maxWidth={false}
        sx={{
          width: '20rem',
          border: { xs: 'none', lg: '2px solid #000' },
          borderRadius: '30px',
        }}
      >
        {hasChild || isCatalogMain ? (
          <CategoriesView categories={categories} parentCategory={category} error={error} loading={loading} />
        ) : (
          <Typography variant='h5' sx={{ textAlign: 'center', padding: '10rem 3rem' }}>
            Тут могла бы быть ваша реклама!
          </Typography>
        )}
      </Container>
    );
  };

  return (
    <>
      <Container maxWidth='xl' sx={{ display: 'flex' }}>
        <Box sx={{ display: { xs: 'none', lg: 'block' } }}>
          <CategoryList />
        </Box>

        <Container sx={{ display: 'flex', flexDirection: 'column' }}>
          <Container sx={{ display: { xs: 'block', lg: 'none' }, margin: '0 0 2rem' }}>
            <Button variant='contained' size='large' onClick={toggleDrawer(true)}>
              Show sub-categories
            </Button>
            <Drawer anchor='left' open={drawlerState} onClose={toggleDrawer(false)}>
              <CategoryList />
            </Drawer>
          </Container>

          {category && <CatalogBreadcrumbs categories={categories} category={category} />}

          {!loading && <ProductListView category={category} />}
        </Container>
      </Container>
    </>
  );
}
