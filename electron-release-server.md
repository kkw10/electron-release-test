# 일렉트론 배포 flow

1. electron builder 설정 파일에 배포 서버 URL을 설정한다.
```yaml
appId: com.example.ElectronAutoUpdate

productName: "Electron Release Test"

publish:
  provider: "generic"
  token: "www.url.com"

nsis: 
  oneClick: false
  allowToChangeInstallationDirectory: true

directories: 
  output: "dist/"
  app: "."

win: 
  target: 
    - "nsis"

asarUnpack: "*.node"
```