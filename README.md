# HakiOS Web

HakiOS의 화면 구성과 사용 흐름을 참고해 만든 **브라우저 기반 인터랙티브 UI 프로토타입**입니다. 실제 XNU 커널이나 iOS를 실행하는 프로젝트는 아닙니다.

## 화면과 기능
- 잠금 화면: 시계, 날짜, 위젯 모형, 위로 스와이프해 열기
- 홈 화면: 위젯, 앱 그리드, 도크, 앱별 화면
- 제어 센터: Wi-Fi/Bluetooth/에어플레인/집중 모드 토글, 밝기 조절
- 메모: 작성, 수정, 삭제, 로컬 저장
- 메시지: 대화 생성 및 메시지 보내기, 로컬 저장
- 연락처: 추가 및 삭제
- Safari 스타일 화면: Google 검색 및 최근 검색 기록
- 설정: 라이트/다크 모드, 배경화면, 밝기
- 캘린더, 시계, 사진, 전화, 카메라, 날씨 등의 데모 화면

## 프로젝트 구조
- `index.html` — 가벼운 HTML 진입점
- `styles/` — 공통, 잠금 화면, 홈 화면, 제어 센터, 앱별 스타일
- `src/main.js` — 화면 전환, 제스처, 이벤트 처리
- `src/state.js` — 로컬 상태 및 저장
- `src/screens/` — 잠금 화면, 홈 화면, 제어 센터
- `src/apps/` — 앱별 화면 모듈
- `src/components/` — 공통 아이콘

## Android에서 실행
정적 호스팅에 저장소 루트를 배포한 다음 제공되는 웹 주소를 Chrome에서 열면 됩니다. ES modules를 사용하므로 GitHub의 코드 미리보기 화면이 아니라 배포된 웹 주소로 접속해야 합니다.

## 원본과의 관계
원본 [HakiOS XNU Kernel](https://github.com/oosexgang/hakios-xnu-kernel)은 Android 기기에서 XNU/Darwin 사용자 공간을 구동하는 실험적 커널 프로젝트입니다. 원본 저장소에는 웹용 완성 UI 템플릿이나 배포 가능한 iOS 화면 에셋 전체가 포함되어 있지 않습니다. 이 프로젝트는 원본에 포함되지 않은 iOS 바이너리·이미지·아이콘을 복사하지 않고, 직접 작성한 HTML/CSS/JavaScript로 비슷한 흐름을 재구성합니다. 따라서 픽셀 단위의 완전한 복제나 실제 iOS 앱 기능을 보장하지 않습니다.

## 연결 프로젝트
- **Haki React 시뮬레이터:** https://github.com/alamju3-ops/Haki — 홈 화면·앱 흐름의 React 구현입니다.
- **Orbit Messages UI 원본 프로젝트:** https://github.com/alamju3-ops/iphone — Orbit UI 컴포넌트 실험용 Expo 프로젝트입니다.
- HakiOS Web의 메시지 목록과 대화 화면에는 Orbit 스타일을 웹용 HTML/CSS로 적용했습니다. Haki 저장소의 React 메시지 창에도 같은 시각적 방향을 반영했습니다.
