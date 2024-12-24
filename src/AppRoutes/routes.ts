import { RouteProps } from "react-router-dom";
import { ROUTES } from "../constant/routes";
import { CollectionCreatorPage, CollectionPage } from "../page";
import NftItemCreate from "../page/users/nft/create";
import NftPage from "../page/users/nft";
import { HomePage } from "./pageComponent";

const routes: AppRoutes[] = [
    {
		component: HomePage,
		path: ROUTES.HOME_PAGE,
		exact: true,
		key: 'HOME_PAGE',
	},
    // {
	// 	component: null,
	// 	path: ROUTES.ABOUT,
	// 	exact: true,
	// 	key: 'ABOUT',
	// },
    {
		component: CollectionPage,
		path: ROUTES.PROFILE,
		exact: true,
		key: 'PROFILE',
	},
    {
		component: CollectionPage,
		path: ROUTES.COLLECTION,
		exact: true,
		key: 'COLLECTION',
	},
    {
		component: CollectionCreatorPage,
		path: ROUTES.CREATE_COLLECTION,
		exact: true,
		key: 'CREATE_COLLECTION',
	},
    {
		component: NftItemCreate,
		path: ROUTES.CREATE_NFT_COLLECTION,
		exact: true,
		key: 'CREATE_NFT_COLLECTION',
	},
    {
		component: NftPage,
		path: ROUTES.NFT_COLLECTION,
		exact: true,
		key: 'NFT_COLLECTION',
	},
];

export interface AppRoutes {
	component: React.ComponentType<any>;
	path: RouteProps['path'];
	exact: boolean;
	key: keyof typeof ROUTES;
}

export default routes