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
        <Link to={`/catalog/${res.slug[siteLocale]}`} style={{ textDecoration: 'none' }} color='inherit' key='{c.id}'>
          {res.name[siteLocale]}
        </Link>
      )
    );
  });

  return (
    <Breadcrumbs aria-label='breadcrumb' sx={{ ml: 2, mb: 2 }}>
      <Link to={'/catalog'} style={{ textDecoration: 'none' }} color='inherit'>
        Catalog
      </Link>

      {paths}

      <Typography color='text.primary'>{category.name[siteLocale]}</Typography>
    </Breadcrumbs>
  );
}
