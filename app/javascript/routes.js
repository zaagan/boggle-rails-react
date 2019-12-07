import React from "react";
import {
  ROUTE_INTRO,
  ROUTE_STAGE1,
  ROUTE_STAGE2,
  ROUTE_SCORES
} from "./constants/routeNames";

// INTRODUCTION PAGE
const GameIntro = React.lazy(() =>
  import("./components/screens/intro/GameIntro")
);

// GAME STAGES
const Stage1 = React.lazy(() => import("./components/screens/stage/Stage1"));

// SCORES PAGE
const Scores = React.lazy(() => import("./components/screens/scores/Scores"));

const defaultRoutes = [
  { path: ROUTE_INTRO, exact: true, name: "GameIntro", component: GameIntro },
  { path: ROUTE_STAGE1, exact: true, name: "Stage 1", component: Stage1 },
  { path: ROUTE_SCORES, exact: true, name: "Scores", component: Scores }
];

export default defaultRoutes;
