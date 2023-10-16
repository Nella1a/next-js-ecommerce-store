const products = [
  {
    title: 'Monstera Deliciosa',
    price: 17.95,
    descr:
      'Monstera are species of evergreen tropical vines and shrubs that are native to Central America. They are famous for their natural leaf-holes, which has led to the rise of their nickname, Swiss Cheese Plant.',
    slug: 'monstera-deliciosa',
  },
  {
    title: 'Ficus Lyrata',
    price: 9.95,
    descr:
      'Needs Bright, Filtered Light. Will rapidly deteriorate in dim lighting.Keep soil evenly moist at all times. (about 2-3x per week)  Do not overwater or leave plant sitting in water.',
    slug: 'ficus-lyrata',
  },
  {
    title: 'Pilea Peperomioides',
    price: 12.95,
    descr:
      'An easy plant to care for. Like most of our favorite indoor house plants, Pilea prefers bright, indirect light. Too much direct sun will scorch the round leaves.Water about once a week, or when the soil is nearly dry. Keep your plant in a well draining pot to avoid letting the roots sit in water.',
    slug: 'pilea-peperomioides',
  },
  {
    title: 'Calathea Orbifolia',
    price: 26.95,
    descr:
      'The Calathea orbifolia is a flowering species of plant in the family Marantaceae. The perennial plants are native to tropical forests in Central and South America, Asia, and Africa. Outdoors, calatheas grow on the forest floor, where they thrive in shaded, warm, humid environments.',
    slug: 'calathea-orbifolia',
  },
];

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.product.createMany({ data: products });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

const emptyModuleExport = {};
export default emptyModuleExport;
