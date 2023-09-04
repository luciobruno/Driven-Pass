import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import { PrismaService } from '../../src/prisma/prisma.service';
import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../src/app.module';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

describe('User E2E Tests', () => {
  let app: INestApplication;
  let prisma: PrismaService = new PrismaService();

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(PrismaService)
      .useValue(prisma)
      .compile();
    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    prisma = app.get(PrismaService);

    await prisma.user.deleteMany();
    await prisma.note.deleteMany();
    await prisma.credential.deleteMany();
    await prisma.card.deleteMany();

    await app.init();
  });

  it('POST /credentials should return status 201', async () => {
    const user = await prisma.user.create({
      data: {
        email: 'teste@teste.com',
        password: bcrypt.hashSync('T3ste@S2', 10),
      },
    });
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
    );
    await request(app.getHttpServer())
      .post('/credentials')
      .send({
        name: 'Credential',
        url: 'facebook.com.br',
        password: 'S3cure@T3ste',
        username: 'facebook',
      })
      .set('Authorization', `Bearer ${token}`)
      .expect(HttpStatus.CREATED);
  });
});
