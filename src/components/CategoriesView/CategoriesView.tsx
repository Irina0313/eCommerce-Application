import React from 'react';
import { CircularProgress, Typography, Box } from '@mui/material';
import CategorieListItem from '../CategoriesViewItem/CategoriesViewItem';
import { Category } from '@commercetools/platform-sdk';

interface ICategoriesViewProps {
  categories: Category[];
  parentCategory?: Category;
  error: string;
  loading: boolean;
}

export default function CategoriesView({ categories, parentCategory, error, loading }: ICategoriesViewProps) {
  const getCategoriesList = (cat: undefined | string, level = 0): JSX.Element[] => {
    const content = [];
    for (let i = 0; i < categories.length; i++) {
      const category = categories[i];
      if (category.parent?.id === cat) {
        content.push(<CategorieListItem category={category} key={category.id} level={level} />);
        content.push(...getCategoriesList(category.id, level + 1));
      }
    }
    return content;
  };

  return (
    <>
      <Typography variant='h5' m={3} textAlign={'center'}>
        Categories
      </Typography>

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <CircularProgress size={24} sx={{ color: 'grey' }} />
        </Box>
      )}

      {error && (
        <Typography color={'error'} mt={3} textAlign={'center'}>
          {error}
        </Typography>
      )}

      {!loading && !error && getCategoriesList(parentCategory?.id)}
    </>
  );
}
