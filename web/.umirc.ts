import px2rem from 'postcss-plugin-px2rem';
import path from 'path';
export default {
  npmClient: 'yarn',
  extraPostCSSPlugins: [
    px2rem({
      rootValue: 18.75,
      propBlackList:['border','border-top','border-left','border-right','border-bottom','border-radius','font-size'],//这些属性不需要转换
    })
  ],
  alias: {
    '@': path.resolve(__dirname, "src")
  },
  routes: [
    {
      path: "/",
      component: "@/pages/Home/home.tsx"
    },
    {
      path: "/articles/:id",
      component: "@/pages/Article/article.tsx"
    },
    {
      path: "/heroes/:id",
      component: "@/pages/Hero/hero.tsx"
    }
  ]
};
