import React from 'react';
import { Button } from '@mui/material';
import { Category } from '@commercetools/platform-sdk';
import { useNavigate } from 'react-router-dom';
import { siteLocale } from '../../api/BuildClient';

interface ICategoriesViewItemProps {
  category: Category;
  level: number;
}

export default function CategoriesViewItem({ category, level }: ICategoriesViewItemProps) {
  const navigate = useNavigate();

  const onClick = (slug: string) => {
    navigate(`/catalog/${slug}`);
  };

  return (
    <>
      <Button
        variant='text'
        fullWidth
        sx={{
          justifyContent: 'flex-start',
          padding: ` 0 0 3px ${0.5 + level * 1.5}rem`,
          color: '#424551',
          textTransform: 'none',
          fontSize: '1.1rem',
          '&:hover': {
            color: '#FF4242',
          },
        }}
        onClick={() => onClick(category.slug[siteLocale])}
      >
        {category.name[siteLocale]}
      </Button>
    </>
  );
}
