# Template Repository for DRF SimpleJWT Apps

Initially created: 3 July 2020

TL;DR: Django server repository setup for SimpleJWT. Test user: `test` and pw `test`.

---
### Example repositories

- Android: [Andrew-Chen-Wang/mobile-auth-example](https://github.com/Andrew-Chen-Wang/mobile-auth-example)
- iOS: [Andrew-Chen-Wang/mobile-auth-example](https://github.com/Andrew-Chen-Wang/mobile-auth-example)

---
### Introduction

This template repository is dedicated to generating
a Django + DRF server with SimpleJWT already setup.
The purpose of this is to easily create repositories
that demonstrate clear usage of SimpleJWT.

If you're not using a frontend framework like React
or some kind of mobile device not using a web browser,
then please use session authentication. I.e. if you're
using plain HTML with Jinja 2 template tags, use the
built-in session authentication middlewear as that
is proven to be the safest and thus far never broken
method of secure authentication.

Note: this template repository is adopted from
[Andrew-Chen-Wang/mobile-auth-example](https://github.com/Andrew-Chen-Wang/mobile-auth-example)
for Android and iOS usage. The license is Apache 2.0
for that example repository.

---
### Usage

1. To generate a repository using this template,
press "Use this template" (highlighted in green).
Note, this will NOT create a fork of the repository.
2. Create your git repository, connect via the ssh remote, and pull.
3. `cd server` to get your terminal/cmd into the server directory.
4. To run the server, create a virtual environment `virtualenv venv && source venv/bin/activate`, install packages `pip install -r requirements.txt` -- the requirements.txt file is inside the server subdirectory -- and do `python manage.py migrate && python manage.py runserver`.
    - Again, make sure when you do this, you are inside the server directory on your terminal/cmd.
    - On Windows, you should do `venv\Scripts\activate` instead of `source venv/bin/activate`
5. If you're writing for an example repository, please create
a new directory labeled with the name of the framework (e.g. jwt-ios),
and add its `.gitignore`. Please use the
[github/gitignore](https://github.com/github/gitignore) repository.
Provide detailed instructions if necessary.

A default user with the username `test` and password `test` have been created.

This repository does not come with throttling, but **it is
highly recommended that you add throttling to your entire
project.** You can use a third-party package called
Django-ratelimit or DRF's internal throttling mechanism.
Django-ratelimit is more extensive -- covering Django views,
as well -- and thus more supported by SimpleJWT.

---
### License

This repository is licensed under the 
[MIT License](https://github.com/SimpleJWT/drf-SimpleJWT-server-template/blob/master/LICENSE).
