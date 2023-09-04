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
      <Button color='primary' variant='text' fullWidth sx={{ justifyContent: 'flex-start', paddingLeft: `${0.5 + level * 1.5}rem` }} onClick={() => onClick(category.slug[siteLocale])}>
        {category.name[siteLocale]}
      </Button>
    </>
  );
}
