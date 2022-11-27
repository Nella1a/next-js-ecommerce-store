import { css } from '@emotion/react';
import Image from 'next/image';
import Link from 'next/link';
import { Fragment } from 'react';
import { styleSectionProducts } from '../components/elements';

const imgStyle = css`
  display: block;
  border: 5px solid grey;
`;

type Plants = {
  id: number;
  name: string;
  price: number;
};

type Props = {
  plants: Plants[];
};

const img = css`
//width: 15.56rem;
`;

// width: 393, height: 491,5
export default function ProductsComponent(props: Props) {



  return (
    <Fragment>
      {props.plants.map((event) => {
        return (
          <article key={`guest-${event.id}`} css={styleSectionProducts}>
              <div>
                {event.id === 1 && <span>Easy Care</span>}
                {event.id === 4 && <span>Pet-Friendly</span>}
                <a href={`/Products/${event.id} `}>
                  <img src={`/image0${event.id}.jpeg`} alt="succulenten1" css={img}
                  />
                </a>
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
