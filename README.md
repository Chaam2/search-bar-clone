# Search Bar Clone Project
## 프로젝트 소개

병명을 검색 시 입력된 단어를 바탕으로 추천검색어를 보여주는 로직을 구현했습니다.<br>
[**🌐 배포 사이트 바로가기**](https://search-bar-clone.vercel.app/)

## 데모영상
|**디바운싱 및 데이터 캐싱**|<img  src="https://github.com/Chaam2/search-bar-clone/assets/126763111/cf803afe-8d60-4875-a7f0-78db8c98722a"/> |
| :---: | :---: |
| **키보드로 포커스 이동**| <img  src="https://github.com/Chaam2/search-bar-clone/assets/126763111/a831f2ed-8664-4f7e-bf4b-007d748594c0"/> |


## 개발 환경

### Development

<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white"/> <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white"/> <img src="https://img.shields.io/badge/React Router-CA4245?style=for-the-badge&logo=React Router&logoColor=white"> <img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=Axios&logoColor=white"/>

### Styling

<img src="https://img.shields.io/badge/styled component-DB7093?style=for-the-badge&logo=styled-components&logoColor=white"/>

### Convention

<img src="https://img.shields.io/badge/husky-brown?style=for-the-badge&logo=npm"> <img src="https://img.shields.io/badge/lint staged-white?style=for-the-badge&logo=npm"> <img src="https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint"> <img src="https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=white">

## 디렉토리 구조

```
📦src
 ┣ 📂api
 ┃ ┣ 📜apiClient.ts
 ┃ ┗ 📜search.ts
 ┣ 📂components
 ┃ ┗ 📂Search
 ┃ ┃ ┣ 📜Search.style.ts
 ┃ ┃ ┣ 📜SearchBar.tsx
 ┃ ┃ ┗ 📜index.tsx
 ┣ 📂hooks
 ┃ ┣ 📜useDebounce.ts
 ┃ ┗ 📜useSearchResult.ts
 ┣ 📂types
 ┃ ┗ 📜TypeSearchResult.ts
 ┣ 📂utils
 ┃ ┗ 📜cacheStorage.ts
 ┣ 📜App.tsx
 ┣ 📜index.css
 ┗ 📜index.tsx
```

## Assignment별 구현 방식

### Assignment 1. API호출을 통해 검색어 추천 기능 구현

 - axios instance로 api호출 및 캐싱 관리
 - 검색창 영역인 SearchBar 컴포넌트와 추천리스트 영역인 SearchSuggestionBox 컴포넌트로 분리 

### Assignment 2. API 호출별로 로컬 캐싱 구현 (+expire time)
 - 캐시스토리지에 저장 ( 로컬/세션 스토리지에 저장하기엔 5mb 용량제한때문에 관리가 어려울것이라 예상) 
 - 쿼리별 최초 api 호출 시 받아온 데이터를 캐시스토리지에 저장하고, 이후 api요청 시 캐시된 데이터가 있는지 확인 후 캐시된 데이터가 있으면 해당 데이터 리턴 
 - 캐시데이터 저장 시 헤더에 expireDate를 저장 → 캐시된 데이터를 불러올 때 expireDate를 체크하여 만료된 경우 새롭게 api를 호출하고, 해당 데이터로 기존 캐싱데이터를 업데이트함### Assignment 3. 입력 시 API 호출 횟수 최소화 전략

### Assignment 3. 입력 시 API 호출 횟수 최소화 전략
- useDebounce hook을 통해 디바운싱 로직 처리 
- debouncedKeyword state를 만들고 일정 시간동안 입력이 없으면 해당 키워드를 debouncedKeyword 상태로 업데이트 
- debouncedKeyword를 trim()메서드로 공백 제거 후 api요청 
### Assignment 4. 키보드만으로 추천 검색어 이동 기능 구현
- focusedIndex state를 통해 현재 포커스된 li요소의 상태를 관리
- `if(e.nativeEvent.isComposing) return;` 처리를 통해 한국어 입력시 마지막 글자 한번 더 입력되는 이슈 해결                                                                                                                                       

### Assignment 5. 기타 사항

 - 추천 검색어 리스트에서 리스트 항목 클릭 시 해당 항목으로 검색어 키워드 변경 
 - 추천 검색어 최대 7개까지 노출   
