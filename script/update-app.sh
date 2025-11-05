#!/bin/bash

# Переходим в директорию приложения
cd ~/film-react-nest

# Логируем начало обновления
echo "$(date): Starting application update..."

# Pull последних версий образов
docker compose pull

# Перезапускаем сервисы
docker compose up -d

# Очищаем старые образы
docker image prune -f

# Проверяем статус
docker compose ps

echo "$(date): Update completed successfully"