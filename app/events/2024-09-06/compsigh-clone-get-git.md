---
title: "compsigh clone: get git"
description: "join us for our first compsigh clone workshop, and get good at Git with Gursh! part one of a two-workshop series where you'll get help with your dev setup, learn Git commands, and practice the workflow teams use in the real world. you'll be more than prepared for not only all your USF CS classes, but well on your way to becoming a professional software dev!"
authors: [{ name: "Gursh", avatar: "/avatars/gursh.png" }]
og_image: "/events/2024-09-06/compsigh-clone-get-git-og.png"
event_details: {
  hide_on_timeline: true,
  start: 1725678000,
  end: 1725681600,
  location: "The Hive",
  cover_image: "/events/2024-09-06/compsigh-clone-get-git.png",
  pictures: []
}
---

Our first compsigh clone workshop — get good at Git! Part one of a two-workshop series where you'll get help with your dev setup, learn Git commands, and practice the workflow teams use in the real world. You'll be more than prepared for not only all your USF CS classes, but well on your way to becoming a professional software dev!

## Agenda

- Duration: 90 minutes
- Format: Hands-on workshop with live demonstrations and exercises
- Target audience: Beginners with basic programming knowledge

### Introduction (15 minutes)

- Welcome and workshop objectives
- Brief overview of version control and its importance
    1. `git` is a widely-used system for *distributed version control*. What does that even mean? That means multiple people can contribute code to their own local repository (*repo*) (basically a folder) and collaborate with other people who are also making changes to their local repos.
    2. `github.com` provides *remote repos* (folders that people can connect to) which you will use for turning in work to be graded and in life just for sharing your code.

### Setting Up (30 minutes)

Prerequisites:

- For MacOS/Linux users, check if Git is installed. For Windows Users, get WSL installed and configured.
  - If not installed, installing Git (compsigh leadership handle this directly with people that don't have it preinstalled)
- Creating a GitHub account
- Configuring Git with your name and email

### Git Basics (45 minutes)

- Creating a repository
- Understanding the basic Git workflow
- Adding and committing changes
- Viewing commit history

### Working with Remote Repositories (45 minutes)

- Introduction to GitHub
- Cloning a repository
- Pushing changes to GitHub
- Pulling changes from GitHub

## Setup instructions

These steps will help you get set up with an SSH key and get it connected to GitHub. You'll need this for sharing your code on the platform, and it's a prerequisite for just about any remote work in your CS classes at USF.

If you're not sure whether or not you've got an SSH key already, go ahead and run `ls ~/.ssh && ssh -T git@github.com`. Any kind of error and you'll want to follow these steps. :)

1. Head over to your GitHub settings, go to **Emails**, and enable **Keep my email addresses private** and **Block command line pushes that expose my email**. This does two things for you:
    - It enables you to add and remove emails to your GitHub account without associating your *commits* with those email addresses. In other words, you won't lose contributions if you lose access to an email you have to remove one day.
    - Privacy! Commits to GitHub repos that are open-source are public, which include author info *(including your email!)*. Using GitHub's will avoid exposing your own.
2. So, from here, you should see an email address in the form `"<id>+<username>@users.noreply.github.com"`. Copy that to your clipboard; we'll need it in a bit!
3. For Windows users, make sure you're on WSL! To install, open an elevated terminal and run `wsl --install`. In your terminal, run `cd ~/.ssh`. If the directory doesn't exist, run `mkdir ~/.ssh` and rerun `cd ~/.ssh`.
4. Let's generate an SSH key. Run `ssh-keygen -t ed25519 -C "<that email from GitHub you copied earlier>"`. Hit `Enter` a bunch of times until you see your shell prompt again.
5. Open `~/.ssh/config` in your editor of choice. Paste this in:

    ```plaintext
    Host github.com
      AddKeysToAgent yes
      IdentityFile ~/.ssh/id_ed25519
    ```

6. Now, we're going to add that SSH key to GitHub. Run `pbcopy < ~/.ssh/id_ed25519.pub`. If you're on WSL, it's a bit funky, so just run `cat ~/.ssh/id_ed25519.pub` and copy the output to your clipboard manually.
7. Back in your GitHub settings, go to **SSH and GPG keys** and click **New SSH key**. Add a descriptive label as the title like "Gursh's laptop". Make sure the "Key type" is "Authentication Key". Then go ahead and paste from your clipboard into the "Key" box and hit **Add SSH key**.
8. Finally, run `ssh -T git@github.com`. You should be able to connect right away, but the USFConnect weirdness might interfere. If it does, hit `^C` to stop the connection attempt. If you want to avoid installing any sus VPNs, the recommended workaround is to [connect to GitHub over HTTPS instead of SSH](https://docs.github.com/en/authentication/troubleshooting-ssh/using-ssh-over-the-https-port).

## Notes

### Git: what and why?

Git is a version control system. *What does that mean?* Version control systems:

- Are a way to track and manage changes to files, enabling collaboration on projects while keeping a history of modifications;
- Allow users to revert to previous versions, compare changes, and merge updates from different branches (different work environments), ensuring that changes are organized and recoverable;
- Are essential for software development and team collaboration because we devs are dumb sometimes but also want to be organized and if we make changes that can break stuff, we don't want that to be pushed straight to our final product; we want to be able to test stuff and make sure things are solid before we push to `main` (more on that later).

*What does a dev workflow with Git look like?*

You change your code. You add a feature, you remove a bug, you build your entire project in one go (if you're like me lol), whatever you do, you want to save your work, right? Without Git, the stuff you're working on is just sitting in a folder.

When you're ready to **commit** your code (I'll explain that in a sec), you'll **add** it to the **staging** area, where you can look through your code and make sure that what you're about to commit is something you actually want to commit.

### Using Git

When you're committing your code, you're saying that what you've made is ready to get pushed to `main`. It's like signing off on what you did. If you're sure the changes you made are good to go, commit and push!

Here's the thing though: you don't want to work on multiple things or an entire project, and then just commit it. For the sake of being able to develop *incrementally* (bit by bit), test smaller pieces of your code, and simply just minimizing the risk of losing work, *you want to commit frequently* and *group relevant changes together*.

You can add modifications made to a file to the staging area with `git add <file>`. Likewise, multiple files: `git add <file> [files...]`. Or, the whole directory: `git add .`.

Think of commits as snapshots of your work.

Then, once you've looked over the staging area, it's time to commit: `git commit -m "<Meaningful commit message>"`. "Fix client-server sync bug", "Add Google OAuth", and "Document int_to_str()" are all examples of meaningful commit messages. They are *atomic*:

- They represent pieces of your code you can test individually.
- They represent changes you can revert if they cause issues down the line, without losing progress elsewhere.

### Sharing your changes

When you commit your code, it's saved! ...*Locally*. You can run `git log` in a repository with multiple commits to see the history of what you've done throughout the project.

These changes aren't very useful just sitting around on your machine though! This is where GitHub comes in.

GitHub provides *remote repos* ("folders" that people can connect to) which you will use for turning in work to be graded and almost certainly in your professional life for sharing code with your team.

Check out the [compsigh demo repo](https://github.com/compsigh/github_workshop) for practice on cloning, pulling, writing, and pushing!

See you next time for part two!
