import Preprocessing from "../pageview/preprocessing/index.js"
import Classify from "../pageview/classify/index.js"
import Detect from "../pageview/detect/index.js"

const routes = [
    { path: "/", exact: true, name: "数据预处理", component: Preprocessing },
    { path: "/preprocessing", exact: true, name: "数据预处理", component: Preprocessing },
    { path: "/classify", exact: true, name: "分类", component: Classify },
    { path: "/detect", exact: true, name: "故障检测", component: Detect }
];

export default routes;
