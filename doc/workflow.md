# Workflow. 
**Version : v1.0 (2020.07.09)**


- 업무 협업을 원활히 진행하기 위해 개발업무절차에 대해 설명합니다.
- 아래 GitLab 기반 워크플로우 가이드 링크의 [2. 개발업무절차(workflow)] 항목을 참고하세요.
- 브랜치 규칙은 Feature Branch Workflow 모델을 채용합니다.

[개발업무절차 참고 링크](http://developer.gaeasoft.co.kr/development-guide/workflow/gitlab-workflow-guide/)
[GitLab Issues Guide](https://docs.gitlab.com/ee/user/project/issues/)
[GitLab Merge request Guide](https://docs.gitlab.com/ee/user/project/merge_requests/)

Step1. (Developer) Clone Project (최초 Project 체크아웃 시):
``` bash
$ git clone git@example.com:project-name.git
``` 

Step2. (Master/Developer) Issue 생성.
- 기능 추가, 기능 개선, 버그 픽스 등의 작업내용으로 Issue를 생성한다.
- Issue 내용은 최대한 상세하게 작성한다.
- Issue 내용 : 
    - 기능 명세
    - 기능 제안
    - 버그 내용

Step2. (Developer) Feature Branch 생성 및 체크아웃 :<br/>
- 새 Branch는 할당 받은 Issue ID로 생성합니다.
- ex) i-[Issue ID] => i-3, i-12 
- 체크아웃 된 새 Branch는 해당 Issue에 대한 작업내용만 수정 또는 추가합니다.
``` bash
$ git checkout -b i-[Issue ID]
``` 

Step3. (Developer) 코드작성 후 commit 후 push:
``` bash
$ git add [File Name]
// or
$ git add *
$ git commit -m "My issue is complete. blabla..."
$ git push origin i-[Issue ID]
```

Step4. (Developer) Merge request 생성 및 요청.
- GitLab 사이트에서 Merge request를 생성한다.
- Source branch : 할당 된 Issue내용을 작업한 Branch 선택.
- Target branch : development 브랜친 선
- Master와 Developer가 논의 후 Merge 결정.(Code Review)

Step5. (Master) Issue를 close(완료)한다. 

Step6. (Master) 제품 Release
- development branch에서 테스트를 진행하고 문제 없을 시 상용브랜치(master branch)와 merge한다.
- commit 시점으로 Tag(Version)를 생성한다. 
