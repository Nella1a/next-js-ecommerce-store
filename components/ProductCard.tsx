import Link from 'next/link';
import { Fragment } from 'react';
import { styleSectionProducts } from '../components/elements';

type Plants = {
  id: number;
  name: string;
  price: number;
  slugName?: string;
};

type Props = {
  plants: Plants[];
};

export default function ProductCard(props: Props) {
  // slug-name
  props.plants.map((plant) => {
    plant.slugName = plant.name.toLowerCase().replace(/\s+/g, '-');
  });

  return (
    <Fragment>
      {props.plants.map((event: any) => {
        return (
          <article key={`guest-${event.id}`} css={styleSectionProducts}>
            <div>
              {event.id === 1 && <span>Easy Care</span>}
              {event.id === 4 && <span>Pet-Friendly</span>}{' '}
              <Link href="/product/[slug]" as={`/product/${event.slugName}`}>
                <a>
                  <img
                    src={`/image0${event.id}.jpeg`}
                    alt={`plantName-${event.name}`}
                  />
                </a>
              </Link>
            </div>
            <div>
              <h3>{event.name}</h3>
              <p>€{event.price}</p>
            </div>
          </article>
        );
      })}
    </Fragment>
  );
}
