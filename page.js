"use client";

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function ArticlesDashboard() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  // Utilisation de fetch pour récupérer les articles
  useEffect(() => {
    fetch("/api/news/latest")
      .then(response => {
        if (!response.ok) {olmddslmvl
          throw new Error("Erreur lors de la récupération des articles");nkasndkla
        }
        return response.json();
      })
      .then(data => {wdnkwndkwndnkwndknw
        setArticles(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Erreur de chargement des articles:", error);
        setLoading(false);
      });dnkwndkwwwndknd
  }, []);

  // Fonction pour mettre à jour le statut de l'article
  const handleUpdateStatus = (articleId, status) => {dwkdnkwdnkdw
    fetch(`/api/news/${articleId}/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("Erreur lors de la mise à jour du statut");
        }
        setArticles(prevArticles =>
          prevArticles.map(article =>
            article._id === articleId ? { ...article, status } : article
          )
        );
      })
      .catch(error => console.error("Erreur lors de la mise à jour du statut:", error));
  };

  if (loading) return <p>Chargement des articles...</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {articles.map(article => (
        <Card key={article._id} className="p-4">
          <CardContent>
            <h2 className="text-xl font-bold">{article.title}</h2>
            <p className="text-gray-600">{article.category}</p>
            <p className="mt-2">{article.content.substring(0, 100)}...</p>
            <div className="flex gap-2 mt-4">
              <Button variant="outline" onClick={() => window.location.href = `/articles/${article._id}`}>Voir détails</Button>
              <Button onClick={() => handleUpdateStatus(article._id, "approved")} className="bg-green-500">Approuver</Button>
              <Button onClick={() => handleUpdateStatus(article._id, "rejected")} className="bg-red-500">Rejeter</Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
