import React, { useEffect } from 'react';
import { Grid, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppSelector } from '../../hooks/useAppSelector';
import CategoriesView from '../../components/CategoriesView/CategoriesView';

export function CategoryPage() {
  const { categories, error, loading } = useAppSelector((state) => state.categoriesReducer);
  const params = useParams<'id'>();
  const navigate = useNavigate();
  // TODO: very very bad code....
  const category = categories.find((c) => c.slug['en-US'] === params.id);
  const hasChild = category ? categories.some((c) => c.parent?.id === category.id) : undefined;

  useEffect(() => {
    console.log('CategoryPage useEffect');
    if (!loading && !category) navigate('/404', { replace: true });
  }, [loading, category]);

  return (
    <Grid container spacing={1}>
      {hasChild && (
        <Grid item xs={12} md={1} mr={2} pb={4} border={'2px solid #000'} borderRadius={'30px'}>
          <CategoriesView categories={categories} parentCategory={category} error={error} loading={loading} />
        </Grid>
      )}

      <Grid item border={'2px solid #000'} borderRadius={'30px'}>
        <Typography variant='h1' m={10}>
          Category page: {category?.name['en-US']}
        </Typography>

        <Typography variant='h3'>Hi there!</Typography>
      </Grid>
    </Grid>
  );
}
