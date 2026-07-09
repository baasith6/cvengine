# Contributing to CVEngine

First off, thank you for considering contributing to CVEngine! It's people like you that make CVEngine such a great tool.

## Where do I go from here?

If you've noticed a bug or have a feature request, make one! It's generally best if you get confirmation of your bug or approval for your feature request this way before starting to code.

## Fork & create a branch

If this is something you think you can fix, then fork CVEngine and create a branch with a descriptive name.

A good branch name would be (where issue #325 is the ticket you're working on):
```sh
git checkout -b 325-add-new-font-theme
```

## Get the test suite running

Make sure you're using Node.js 18 or newer.

```sh
npm install
npm run dev
```

## Implement your fix or feature

At this point, you're ready to make your changes. Feel free to ask for help; everyone is a beginner at first.

## Make a Pull Request

At this point, you should switch back to your master branch and make sure it's up to date with CVEngine's master branch:

```sh
git remote add upstream git@github.com:baasith6/cvengine.git
git checkout main
git pull upstream main
```

Then update your feature branch from your local copy of main, and push it!

```sh
git checkout 325-add-new-font-theme
git rebase main
git push --set-upstream origin 325-add-new-font-theme
```

Finally, go to GitHub and make a Pull Request with a clear list of what you've done.

## Guidelines

- Keep code clean and well-commented.
- Use TypeScript heavily, and avoid `any` wherever possible.
- Ensure Tailwind classes are organized.
