import React, { useEffect } from 'react';
import { Grid, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppSelector } from '../../hooks/useAppSelector';
import CategoriesView from '../../components/CategoriesView/CategoriesView';
import { Container } from '@mui/system';

export function CategoryPage() {
  const { categories, error, loading } = useAppSelector((state) => state.categoriesReducer);
  const params = useParams<'id'>();
  const navigate = useNavigate();

  const category = params.id ? categories.find((c) => c.slug['en-US'] === params.id) : undefined;
  const isCatalogMain = !params.id;
  // TODO: very very bad code....
  const hasChild = category ? categories.some((c) => c.parent?.id === category.id) : undefined;

  useEffect(() => {
    console.log('CategoryPage useEffect params.id: ', params.id);
    if (!loading && !category && !isCatalogMain) navigate('/404', { replace: true });
  }, [loading, category]);

  return (
    <>
      <Container maxWidth='xl' sx={{ display: 'flex' }}>
        {(hasChild || isCatalogMain) && (
          <Container
            maxWidth={false}
            sx={{
              width: '20rem',
              border: '2px solid #000',
              borderRadius: '30px',
            }}
          >
            <CategoriesView categories={categories} parentCategory={category} error={error} loading={loading} />
          </Container>
        )}

        <Container
          sx={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Typography variant='h1'>{category ? 'Category page: ' + category?.name['en-US'] : 'Catalog page'}</Typography>
        </Container>
      </Container>
    </>
  );
}
