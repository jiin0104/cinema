# 🎥 Wave Cinema
#### 단 몇번의 클릭으로 나만을 위한 영화를 추천해주는 사이트
<img width="649" alt="1" src="https://github.com/jiin0104/cinema/assets/122608411/49f44745-8003-49e3-9679-15344c2b87cc">
<br>
<br>
<br>

## 목차
1. [개요](#개요)
2. [사용자](#사용자)
3. [개발환경](#개발환경)
4. [설계](#설계)
5. [미리보기](#미리보기)
6. [시연](#시연)
7. [실행](#실행)
<br>
<br>
   
## 개요
* 프로젝트 이름: Wave Cinema
* 기간: 2023.07.25-2023.08.25(약 한달)
* 인원: frontend 2명, backend 3명
* 목적: MBTI와 같이 나만의 개성이 중요한 사회에서, 단 몇 번의 클릭으로 나와 어울리는 영화를 추천 해주는 사이트 
<br>
<br>

## 사용자
* 성별, 연령대, 선호하는 장르, 현재 기분에 따른 영화 추천을 받고 싶은 유저
* 나와 비슷한 성별, 연령대의 사용자들이 많이 추천 받은 영화를 알고 싶은 유저
* 내가 관심있을만한 영화를 알고싶은 유저
<br>
<br>

## 개발환경
### ✔️Frond-end
<div><img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">
<img src="https://img.shields.io/badge/vue.js-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white">
<img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white"> 
<img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white"></div> <br>

### ✔️Back-end
<div><img src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white">
<img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=MySQL&logoColor=white">
<img src="https://img.shields.io/badge/aws-232F3E?style=for-the-badge&logo=aws&logoColor=white"></div>
<br>
<br>

## 설계
### Wireframe
<img src="https://github.com/jiin0104/cinema/assets/122608411/939b5d47-a211-42e7-95b5-e30dc41cb741" width="700" height="500">

### E-R Diagram
<img src="https://github.com/jiin0104/cinema/assets/122608411/1f03cb85-11cd-4007-85c3-f6dd2c3fccb8" width="700" height="500">

### Usecase Diagram
<img src="https://github.com/jiin0104/cinema/assets/122608411/f3afd7c1-2c6f-4af3-b48c-f329485ca3f7" width="700" height="500">

### 요구사항 정의서
<img src="https://github.com/jiin0104/cinema/assets/122608411/86f35d21-bc66-431c-9c0b-6f74881fbbe2" width="700" height="500">

<br>
<br>
<br>


## 미리보기
### Main
|비로그인시|로그인시|
|:---:|:---:|
|<img src="https://github.com/jiin0104/cinema/assets/122608411/dada9fb8-3625-4836-a5ad-71784c60cca3" width="400" height="300">|<img src="https://github.com/jiin0104/cinema/assets/122608411/34c69036-7358-48f6-8a9a-cf3cd1d74006" width="400" height="300">|
|지금 상영중인 영화, 평점 좋은 영화|내가 좋아할 만한 영화, 나랑 비슷한 사람들이 추천 받은 영화|

### SignUp
|회원가입|
|:---:|
|<img src="https://github.com/jiin0104/cinema/assets/122608411/10704221-8505-4315-a29c-b099de3ea9b1" width="400" height="300">|


### Login
|비로그인시|아이디 찾기|비밀번호 찾기|
|:---:|:---:|:---:|
|<img src="https://github.com/jiin0104/cinema/assets/122608411/7ec09491-5ca7-4fe7-abd6-a63a3bbe4e58" width="300" height="200">|<img src="https://github.com/jiin0104/cinema/assets/122608411/822e2d7c-5713-4acc-b0a1-25551fa77b32" width="300" height="200">|<img src="https://github.com/jiin0104/cinema/assets/122608411/3b7399d4-33d5-4bec-82a4-7f751ec866a1" width="300" height="200">|


### Filtering
|성별|연령대|선호하는 장르|기분|확인|
|:---:|:---:|:---:|:---:|:---:|
|<img src="https://github.com/jiin0104/cinema/assets/122608411/32d8c830-65a6-4e01-8e20-39a3d295a88b" width="300" height="230">|<img src="https://github.com/jiin0104/cinema/assets/122608411/edcbd27c-64e5-4ad9-89ed-e4416c5451b6" width="300" height="230">|<img src="https://github.com/jiin0104/cinema/assets/122608411/7a31965a-c1de-4c42-bd2f-4cb3820e0c7f" width="300" height="230">|<img src="https://github.com/jiin0104/cinema/assets/122608411/70576cc6-28f9-4633-b5f6-8a4288234355" width="300" height="230">|<img src="https://github.com/jiin0104/cinema/assets/122608411/525ec526-8eae-4cc9-82d0-f5efcf89d425" width="300" height="230">|


### Recommend
|추천|영화정보|
|:---:|:---:|
|<img src="https://github.com/jiin0104/cinema/assets/122608411/724cae20-0c04-4c04-a86c-58f1e104c606" width="400" height="300">|<img src="https://github.com/jiin0104/cinema/assets/122608411/f16a4a4b-4ee1-4f03-9c02-4dfa80534f20" width="400" height="300">|


### UserRecommend
|추천리스트|리뷰등록|
|:---:|:---:|
|<img src="https://github.com/jiin0104/cinema/assets/122608411/1372c50a-30cd-4c95-b08c-e99151d20fd5" width="400" height="300">|<img src="https://github.com/jiin0104/cinema/assets/122608411/87a0726e-9d6a-46bb-852e-225060cbe168" width="400" height="300">|


### Bigdata
|나와 성별,연령대가 같은 사람이 추천받은 영화|
|:---:|
|<img src="https://github.com/jiin0104/cinema/assets/122608411/a09d2805-3786-474c-8338-6582dbf88e5e" width="400" height="300">|
<br>
<br>


## 시연
### Main & Filtering & Recommend
![ezgif com-video-to-gif (1)](https://github.com/jiin0104/cinema/assets/122608411/a84574dc-858f-4ddb-b611-8812fca8084b)
### UserRecommend & Review
![리뷰](https://github.com/jiin0104/cinema/assets/122608411/25250b56-bec2-425d-a164-6d109ca4fd24)
<br>
<br>

## 실행
### front

    cd vueserver
    npm install
    npm run serve

### back

    cd Nodeback
    npm install
    node app.js
