# CloudFlare Worker Exemple

Ce repository est un exemple de code d'un Worker CloudFlare permetant d'interagir avec le système FirstID directement depuis CloudFlare.

Il va : 
* Détecter si l'utilisateur dispose déjà d'un cookie `fistid` ou non
* Si ne n'est pas le cas, alors il fera la redirection vers le service FirstID, puis créra le cookie de 1er niveau sur votre domaine avec la valeur de l'identifiant FirstID

## Installation

Vous devez disposer de node **v16.13.0** au minimum

```shell
cp wrangler.toml.example wrangler.toml
```

Puis modifier le fichier de configuration pour l'adapter à votre contexte.

```shell
npm i
```

## Documentation

Rendez-vous sur la [documentation FirstID](https://docs.first-id.fr/) dans la section **Integration > Sur votre CDN > CloudFlare** 

