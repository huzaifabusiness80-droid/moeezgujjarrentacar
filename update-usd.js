const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function updatePrices() {
  await prisma.subService.updateMany({
    where: { slug: 'mercedes-s-class' },
    data: { priceOrFee: 'PKR 35,000 / Day', priceUsd: '$125 / Day' }
  });
  await prisma.subService.updateMany({
    where: { slug: 'audi-a6' },
    data: { priceOrFee: 'PKR 30,000 / Day', priceUsd: '$110 / Day' }
  });
  await prisma.subService.updateMany({
    where: { slug: 'land-cruiser-v8' },
    data: { priceOrFee: 'PKR 25,000 / Day', priceUsd: '$90 / Day' }
  });
  await prisma.subService.updateMany({
    where: { slug: 'prado-tx' },
    data: { priceOrFee: 'PKR 18,000 / Day', priceUsd: '$65 / Day' }
  });
  await prisma.subService.updateMany({
    where: { slug: 'fortuner-legender' },
    data: { priceOrFee: 'PKR 15,000 / Day', priceUsd: '$55 / Day' }
  });
  await prisma.subService.updateMany({
    where: { slug: 'honda-civic-rs' },
    data: { priceOrFee: 'PKR 8,000 / Day', priceUsd: '$30 / Day' }
  });
  await prisma.subService.updateMany({
    where: { slug: 'hyundai-sonata' },
    data: { priceOrFee: 'PKR 10,000 / Day', priceUsd: '$35 / Day' }
  });
}
updatePrices().then(() => console.log('Prices fixed!'));
