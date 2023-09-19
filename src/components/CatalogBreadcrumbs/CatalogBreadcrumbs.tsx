import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Typography } from '@mui/material';
import { Category } from '@commercetools/platform-sdk';
import { siteLocale } from '../../api/BuildClient';

interface ICatalogBreadcrumbsProps {
  categories: Category[];
  category: Category;
}
export default function CatalogBreadcrumbs({ categories, category }: ICatalogBreadcrumbsProps) {
  const paths = category.ancestors.map((c) => {
    const res = categories.find((item) => item.id === c.id);
    return (
      res && (
        <Link to={`/catalog/${res.slug[siteLocale]}`} style={{ textDecoration: 'none', color: '#424551' }} key='{c.id}'>
          <Typography
            sx={{
              '&:hover': {
                color: '#FF4242',
              },
            }}
          >
            {res.name[siteLocale]}
          </Typography>
        </Link>
      )
    );
  });

  return (
    <Breadcrumbs
      aria-label='breadcrumb'
      sx={{
        ml: 2,
        mb: 2,
      }}
    >
      <Link to={'/catalog'} style={{ textDecoration: 'none', color: '#424551', transition: 'color 0.3s' }}>
        <Typography
          sx={{
            '&:hover': {
              color: '#FF4242',
            },
          }}
        >
          Catalog
        </Typography>
      </Link>

      {paths}

      <Typography color='#424551'>{category.name[siteLocale]}</Typography>
    </Breadcrumbs>
  );
}
