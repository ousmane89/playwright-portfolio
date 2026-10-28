# 🎭 Playwright Automation Portfolio

> Portfolio de tests automatisés réalisé dans le cadre d'une reconversion vers l'automatisation QA.

## Stack technique

| Outil | Usage |
|---|---|
| [Playwright](https://playwright.dev) | Framework de test E2E |
| TypeScript | Langage principal |
| GitHub Actions | Pipeline CI/CD |
| Page Object Model | Architecture des tests |

## Structure du projet

```
playwright-portfolio/
├── pages/               # Page Object Models
│   ├── LoginPage.ts
│   ├── InventoryPage.ts
│   └── CartPage.ts
├── tests/               # Suites de tests
│   ├── login.spec.ts       # Tests d'authentification
│   ├── inventory.spec.ts   # Tests du catalogue
│   └── checkout.spec.ts    # Tests E2E parcours achat
├── fixtures/            # Setup partagé entre tests
│   └── index.ts
├── .github/workflows/   # Pipeline CI/CD
│   └── playwright.yml
└── playwright.config.ts # Configuration
```

## Application testée

**[Sauce Demo](https://www.saucedemo.com)** — application de démonstration e-commerce utilisée par la communauté QA pour l'entraînement à l'automatisation.

## Couverture de tests

| Suite | Scénarios | Description |
|---|---|---|
| Authentification | 5 tests | Login valide, erreurs, compte verrouillé |
| Catalogue | 5 tests | Affichage, tri, ajout panier |
| Checkout E2E | 3 tests | Parcours achat complet |

## Lancer les tests en local

```bash
# Installation
npm install
npx playwright install

# Lancer tous les tests
npm test

# Mode visuel (voir le navigateur)
npm run test:headed

# Interface graphique Playwright
npm run test:ui

# Voir le rapport HTML
npm run report
```

## CI/CD

Les tests s'exécutent automatiquement sur GitHub Actions à chaque push sur `main` ou `develop`.  
Le rapport HTML est disponible en artifact après chaque run.

## Profil QA

- 5 ans d'expérience en tests fonctionnels (bancaire, emploi, enseignement supérieur)
- Certification ISTQB Foundation
- Maîtrise : Postman, Squash TM, Xray, Jira, SQL, Python/Pandas
- En cours : ISTQB Agile Tester | Playwright automation

📧 mousmane.sy@gmail.com  
🔗 [LinkedIn](https://linkedin.com/in/ousmane89)
