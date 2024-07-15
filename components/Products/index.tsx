import { css } from '@emotion/react';
import Link from 'next/link';
import { Plant } from '../../util/types';
import ProductCard from '../ProductCard';

export const productCardStyle = css`
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
  transition: all 0.3s;

  border-radius: 15px;
  // image container
  div:first-of-type {
    position: relative;
    border-radius: 15px;

    img {
      border-radius: 20px;
    }
  }

  div:last-of-type {
    //general
    span {
      display: block;
    }

    // title
    span:first-of-type {
      font-size: 1.1rem;
      font-weight: 600;
    }
    // price
    span:last-of-type {
      font-size: 1rem;
    }
  }

  @media (max-width: 56.25rem) {
    // 900px
    div:last-of-type {
      span:first-of-type {
        font-size: 0.9rem;
      }
      // title and price
      span:last-of-type {
        font-size: 0.9rem;
      }
    }
  }

  @media (max-width: 46.875rem) {
    // 750px
    div:last-of-type {
      // title and price
      span {
        width: 50%;
      }
    }
  }

  @media (max-width: 30rem) {
    div:last-of-type {
      span:first-of-type {
        width: 100%;
      }
    }
  }

  @media (max-width: 22.5rem) {
    // 360px
    div:last-of-type {
      span:first-of-type {
        width: 50%;
      }
    }
  }
`;

export default function Products(props: { plants: Plant[] }) {
  // slug-name
  props.plants.map((plant) => {
    plant.slug = plant.title.toLowerCase().replace(/\s+/g, '-');
  });

  return (
    <>
      {props.plants.map((plant: Plant) => (
        <Link
          href="/product/[slug]"
          as={`/product/${plant.slug}`}
          key={`guest-${plant.id}`}
        >
          <article css={productCardStyle}>
            <ProductCard plant={plant} />
          </article>
        </Link>
      ))}
    </>
  );
}
