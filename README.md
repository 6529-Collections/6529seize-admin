# 6529SEIZE ADMIN

API PORT: 4000

# Setup

## Install

```
npm i
```

## Build

```
npm run build
```

# Services

## LOCAL

```
npm run admin:local
```

## STAGING

```
npm run admin:dev
```

PM2

```
pm2 start npm --name=6529admin -- run admin:dev
```

## LIVE

```
npm run admin:prod
```

PM2

```
pm2 start npm --name=6529admin -- run admin:prod
```
