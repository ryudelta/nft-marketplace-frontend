import React from 'react';

export const HomePage = React.lazy(
	() => import('../page/home'),
);

export const CollectionPage = React.lazy(
	() => import('../page')
)

export const CollectionCreatorPage = React.lazy(
	() => import('../page/users/collection/create')
)

export const NftItemCreate = React.lazy(
	() => import('../page/users/nft/create')
)

export const NftPage = React.lazy(
	() => import('../page/users/nft')
)