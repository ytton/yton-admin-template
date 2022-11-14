# curd 说明

这里的内容是为后面做快速添加实体的 cli 做准备,在未添加 cli 之前，可以参考这里的文件，快速添加一个实体的增删查改

1. 首先在当前文件夹全局替换

   - ReplaceMe->大驼峰实体名(比如，BaseInfo)
   - replaceMe->小驼峰实体名(baseInfo)
   - replace-me->base-info

2. 分别把对应内容添加到对应内容的文件夹，比如：
   - router.ts -> router/dynamic.ts
   - store.ts -> stores/实体名.ts
   - type.ts -> api/types/实体名.ts
   - api.ts -> api/实体名.ts
   - curd.vue -> views/实体名/实体名.vue
   - components ->views/实体名/components.vue
