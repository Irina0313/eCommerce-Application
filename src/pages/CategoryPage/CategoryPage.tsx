import React, { useEffect } from 'react';
import { Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppSelector } from '../../hooks/useAppSelector';
import CategoriesView from '../../components/CategoriesView/CategoriesView';
import { Container } from '@mui/system';
import CatalogBreadcrumbs from '../../components/CatalogBreadcrumbs/CatalogBreadcrumbs';

export function CategoryPage() {
  const { categories, error, loading } = useAppSelector((state) => state.categoriesReducer);
  const params = useParams<'id'>();
  const navigate = useNavigate();

  const isCatalogMain = !params.id;
  const category = params.id ? categories.find((c) => c.slug['en-US'] === params.id) : undefined;
  const hasChild = category ? categories.some((c) => c.parent?.id === category.id) : undefined;

  useEffect(() => {
    console.log('CategoryPage useEffect params.id: ', params.id);
    if (!loading && !category && !isCatalogMain) navigate('/404', { replace: true });
  }, [loading, category]);

  return (
    <>
      <Container maxWidth='xl' sx={{ display: 'flex' }}>
        <Container
          maxWidth={false}
          sx={{
            width: '20rem',
            border: '2px solid #000',
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

        <Container sx={{ display: 'flex', flexDirection: 'column' }}>
          {category && <CatalogBreadcrumbs categories={categories} category={category} />}

          <Typography variant='h1'>{isCatalogMain ? 'Catalog page' : `Category page: ${category?.name['en-US']}`}</Typography>
        </Container>
      </Container>
    </>
  );
}
