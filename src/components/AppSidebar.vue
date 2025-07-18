<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { useI18n } from 'vue-i18n'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

const { t } = useI18n()

const sidebarRoutes = [
  {
    name: 'home.label',
    icon: 'ph:house-duotone',
    path: '/home',
  },
  {
    name: 'career.label', // 生涯
    icon: 'ph:user-list-duotone', // 用户列表图标
    path: '/career',
  },
  {
    name: 'search.label', // 查询
    icon: 'ph:magnifying-glass-duotone', // 搜索图标
    path: '/search',
  },
  {
    name: 'match.label', // 对局信息
    icon: 'ph:game-controller-duotone', // 游戏手柄图标
    path: '/match',
  },
  {
    name: 'more.label', // 其他功能
    icon: 'ph:dots-three-duotone', // 三点菜单图标
    path: '/more',
  },
]
</script>

<template>
  <aside class="flex flex-col h-dvh pb-12 pt-2 px-2 justify-between bg-sidebar">
    <nav class="grid gap-1">
      <Tooltip v-for="sidebarRoute in sidebarRoutes" :key="sidebarRoute.name">
        <TooltipTrigger as-child>
          <RouterLink :to="sidebarRoute.path">
            <Button
              variant="ghost"
              size="icon"
              :class="sidebarRoute.path === $route.path ? 'bg-muted' : ''"
              class="rounded-lg"
              :aria-label="t(sidebarRoute.name)"
            >
              <Icon :icon="sidebarRoute.icon" class="size-5" />
            </Button>
          </RouterLink>
        </TooltipTrigger>
        <TooltipContent side="right" :side-offset="5">
          {{ t(sidebarRoute.name) }}
        </TooltipContent>
      </Tooltip>
    </nav>
    <!-- 底部功能按钮 -->
    <div class="flex flex-col gap-1 items-center">
      <!-- OP.GG 按钮 -->
      <Tooltip>
        <TooltipTrigger as-child>
          <RouterLink to="/opgg">
            <Button
              variant="ghost"
              size="icon"
              :class="'/opgg' === $route.path ? 'bg-muted' : ''"
              class="rounded-lg"
              :aria-label="t('opgg.label')"
            >
              <Icon icon="ph:globe-hemisphere-west-duotone" class="size-5" />
            </Button>
          </RouterLink>
        </TooltipTrigger>
        <TooltipContent side="right" :side-offset="5">
          {{ t('opgg.label') }}
        </TooltipContent>
      </Tooltip>
      <!-- 公告按钮 -->
      <Tooltip>
        <TooltipTrigger as-child>
          <RouterLink to="/announcement">
            <Button
              variant="ghost"
              size="icon"
              :class="'/announcement' === $route.path ? 'bg-muted' : ''"
              class="rounded-lg"
              :aria-label="t('announcement.label')"
            >
              <Icon icon="ph:megaphone-duotone" class="size-5" />
            </Button>
          </RouterLink>
        </TooltipTrigger>
        <TooltipContent side="right" :side-offset="5">
          {{ t('announcement.label') }}
        </TooltipContent>
      </Tooltip>

      <!-- 设置按钮 -->
      <Tooltip>
        <TooltipTrigger as-child>
          <RouterLink to="/settings">
            <Button
              variant="ghost"
              size="icon"
              :class="'/settings' === $route.path ? 'bg-muted' : ''"
              class="rounded-lg"
              :aria-label="t('settings.label')"
            >
              <Icon icon="ph:gear-duotone" class="size-5" />
            </Button>
          </RouterLink>
        </TooltipTrigger>
        <TooltipContent side="right" :side-offset="5">
          {{ t('settings.label') }}
        </TooltipContent>
      </Tooltip>
      <!-- 用户头像 -->
      <Tooltip>
        <TooltipTrigger as-child>
          <RouterLink to="/profile">
            <Button
              variant="ghost"
              size="icon"
              class="rounded-lg"
              :class="'/profile' === $route.path ? 'bg-muted' : ''"
              :aria-label="t('profile.label')"
            >
              <Icon icon="ph:user-circle-duotone" class="size-5" />
            </Button>
          </RouterLink>
        </TooltipTrigger>
        <TooltipContent side="right" :side-offset="5">
          {{ t('profile.label') }}
        </TooltipContent>
      </Tooltip>
    </div>
  </aside>
</template>
