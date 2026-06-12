'use client';

import { useEffect, useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";

import { Product } from "@/types/products"; /* para fins de leitura decidi separar o import do type das constantes */
import { PRODUCT_DISPLAY_FIELDS, SEARCHABLE_FIELDS } from "@/types/products"; /* Importando constantes */

export default function Products() {

  
  const [products, setProducts] = useState<Product[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products");

      if (!res.ok) throw new Error("Erro na API");

      const data = await res.json();
      setProducts(data);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const matchesSearch = (product: Product, query: string) => {
    const terms = query.toLowerCase().split(" ").filter(Boolean);

    return terms.every((term) =>
      SEARCHABLE_FIELDS.some((field) => {
        const value = product[field];

        if (!value) return false;

        if (Array.isArray(value)) {
          return value.some((item) =>
            item.toLowerCase().includes(term)
          );
        }

        return value
          .toString()
          .toLowerCase()
          .includes(term);
      })
    );
  };

  const filteredProducts = products.filter((product) =>
    matchesSearch(product, query)
  );

  return (
    <div className="w-full flex justify-center flex-col h-full">
      <div className="border-gray-500 w-1/2 mx-auto mb-4">
        <label htmlFor="search" className="block text-sm/6 font-medium text-gray-900">
          Pesquisa
        </label>
        <div className="mt-2 grid grid-cols-1">
          <input
            id="search"
            name="search"
            type="search"
            placeholder="Pesquisar produtos"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="col-start-1 row-start-1 block w-full rounded-md bg-white py-1.5 pl-10 pr-3 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:pl-9 sm:text-sm/6"
          />
          <MagnifyingGlassIcon
            aria-hidden="true"
            className="pointer-events-none col-start-1 row-start-1 ml-3 size-5 self-center text-gray-400 sm:size-4"
          />
        </div>
      </div>

      <div className="mb-4 border-b border-1"></div>
      <div>

        {loading ? (
          <p className="text-center">Carregando...</p>
        ) : error ? (
          <p className="text-center text-red-500">
            Erro ao carregar produtos
          </p>
        ) : filteredProducts.length === 0 ? (
          <p className="text-center">Nenhum produto encontrado</p>
        ) : (
          <div
            data-testid="products"
            className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filteredProducts.map((product, index) => (
              <div
                key={index}
                data-testid="product"
                className="border rounded p-4 flex gap-4 items-center"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-24 h-24 object-contain flex-shrink-0"
                />

                <div className="flex-1">
                  <h2 className="font-bold">{product.name}</h2>
                  <p className="text-sm text-gray-600 mb-2">
                    {product.model}
                  </p>

                  <div className="text-sm grid grid-cols-2 gap-2">
                    {PRODUCT_DISPLAY_FIELDS.map(({ key, label }) => (
                      <p key={key}>
                        <strong>{label}:</strong> {product[key]}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
