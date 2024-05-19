# 使用PHP官方镜像作为基础镜像
FROM php:8.3-fpm

# 更新包索引并安装依赖
RUN apt-get update && apt-get install -y git curl && rm -rf /var/lib/apt/lists/*

# 安装Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# 设置环境变量，确保Composer使用PHP的fpm版本
ENV PATH="${PATH}:/usr/local/bin"

# 设置工作目录
WORKDIR /var/www

# 复制composer.json和composer.lock文件到工作目录
COPY composer.json composer.lock /var/www/

# 使用Composer安装依赖
RUN composer install --no-interaction --optimize-autoloader --no-scripts --no-progress

# 复制Laravel应用的其余文件到工作目录
COPY . /var/www

RUN composer run-script post-root-package-install
RUN composer run-script post-create-project-cmd

# 设置Web服务器用户（如果需要）
# 注意：确保与nginx.conf中的用户匹配
# ARG WEB_SERVER_USER=www-data
# ARG WEB_SERVER_GROUP=www-data
#
# ENV WEB_SERVER_USER $WEB_SERVER_USER
# ENV WEB_SERVER_GROUP $WEB_SERVER_GROUP

# 设置权限
RUN chown -R ${WEB_SERVER_USER}:${WEB_SERVER_GROUP} /var/www/storage /var/www/bootstrap/cache

# 设置入口点
ENTRYPOINT ["php", "/var/www/artisan", "serve", "--host", "0.0.0.0", "--port", "80"]

# 暴露端口
EXPOSE 80
