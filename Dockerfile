# Sử dụng Node.js image làm base
FROM node:18 AS build

WORKDIR /app

# Copy package.json và package-lock.json vào container
COPY package.json package-lock.json ./

# Cài đặt dependencies
RUN npm install

# Copy toàn bộ source code vào container
COPY . ./

# Build ứng dụng React (Vite)
RUN npm run build

# Dùng Nginx để serve ứng dụng
FROM nginx:alpine

# Copy các file build từ Vite vào thư mục của Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Mở cổng 80 để phục vụ ứng dụng
EXPOSE 80

# Chạy Nginx
CMD ["nginx", "-g", "daemon off;"]
