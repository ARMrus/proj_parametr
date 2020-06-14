#include <stdio.h>
#include <stdlib.h>
#include <math.h>
#include <string.h>

#define SEP ';' /* var-file column separator */

/* --------------------------------------------------------------------------
 * helmkey
 *
 * Program to compute for Helmert & affine planar transformation parameters
 *
 * Usage: helmkey <coord1> <coord2>
 *
 * Input files: coord1 coord2
 *     coord1 - source coordinate 'x1 y1'
 *     coord2 - destination coordinate 'x2 y2'
 *              a row per a point; 3+ points
 *
 * Output: omerc parameter string
 *    k     - Scale factor on initial line
 *    x_0   - Easting at projection center
 *    y_0   - Northing at projection center
 *    gamma - Angle from Rectified to Skew Grid
 *
 * Output file:
 *    var.csv - output SEP separated variances 'dx dy'
 * -------------------------------------------------------------------------- */
int main()
{
  // char buf0[1024], buf1[1024];
  // double x[2], y[2];
  // double xc[2], yc[2];
  // double dx[2], dy[2];
  double s[7] = {0., 0., 0., 0., 0.};
  double xis, yis, xms, yms, counts, xic, yic, xmc, ymc;
  double dxi, dyi, dxm, dym;
  double sdxy0, sdxy2, sdxy3, sdxy4, sdxy5, sdxy6;
  double det, h[6];
  double mu, theta;
  //double yh[2];
  int i=0;
  //FILE *fp0, *fp1, *fp2;
  //har fpfdeg0[] = "0 0 2193212.72 425057.63\n5961.24646929572 -6042.418058525104 2199080.76 418924.47\n-5309.675927667395 3802.5094566899306 2187961.87 428941.23\n3631.8341015912197 -411.6973714287749 2196837.89 424590.33";
  // double fp[4][4];

  double fp_n[4][2];
  double fp_o[4][2];


  fp_n[0][0] = 0;
  fp_n[0][1] = 0;

  fp_n[1][0] = 5961.237432714999;
  fp_n[1][1] = -6042.433467389349;

  fp_n[2][0] = -5309.688204756518;
  fp_n[2][1] = 3802.5246459818395;

  fp_n[3][0] = 3631.8472368618127;
  fp_n[3][1] = -411.6494291051645;




  fp_o[0][0] = 2193212.72;
  fp_o[0][1] = 425057.63;

  fp_o[1][0] = 2199080.76;
  fp_o[1][1] = 418924.47;

  fp_o[2][0] = 2187961.87;
  fp_o[2][1] = 428941.23;

  fp_o[3][0] = 2196837.89;
  fp_o[3][1] = 424590.33;

  /* coordinate sums */
 i=0;
 while (i<3) {

   xis += fp_n[i][0]; //X0
   yis += fp_n[i][1]; //Y0
   xms += fp_o[i][0]; //Xmsk
   yms += fp_o[i][1]; //Ymsk
   counts += 1.;

   i++;
 }


 // printf("s0=%.16g\n",s[0]);
 // printf("s1=%.16g\n",s[1]);
 // printf("s2=%.16g\n",s[2]);
 // printf("s3=%.16g\n",s[3]);
 // printf("s3=%.16g\n",s[4]);


  xic = xis / counts;  //X0сред
  xmc = xms / counts;  //Xmskсред
  yic = yis / counts;  // Y0сред
  ymc = yms / counts;  //Ymskсред

 printf("X0сред=%.16g\n",xic);
 printf("Y0сред=%.16g\n",yic);

 printf("Xmskсред=%.16g\n",xmc);
 printf("Ymskсред=%.16g\n",ymc);

 for (i = 0; i < 7; i++)
   s[i] = 0.;

   i=0;
   while (i<3) {

   // dx[0] = fp_n[i][0] - xic; //X0сред
   // dx[1] = fp_n[i][1] - yic; //Y0сред
   // dy[0] = fp_o[i][0] - xmc; //Xmskсред
   // dy[1] = fp_o[i][1] - ymc; //Ymskсред

   dxi = fp_n[i][0] - xic; //X0сред
   dyi = fp_n[i][1] - yic; //Y0сред
   dxm = fp_o[i][0] - xmc; //Xmskсред
   dym = fp_o[i][1] - ymc; //Ymskсред

   /* summation */
   // s[0] += dxi * dxi;
   // /*s[1] += dxi * dyi;*/
   // s[2] += dyi * dyi;
   // s[3] += dxi * dxm; //x
   // s[4] += dyi * dxm;  //h1
   // s[5] += dxi * dym;  //h1
   // s[6] += dyi * dym; //x



   sdxy0 += dxi * dxi;
   /*s[1] += dxi * dyi;*/
   sdxy2 += dyi * dyi;
   sdxy3 += dxi * dxm; //x
   sdxy4 += dyi * dxm;  //h1
   sdxy5 += dxi * dym;  //h1
   sdxy6 += dyi * dym; //x

   i++;
 }

 printf("dX0сред=%.16g\n",dxi);
 printf("dY0сред=%.16g\n",dyi);
 printf("dXmskсред=%.16g\n",dxm);
 printf("dYmskсред=%.16g\n",dym);


 printf("S0=%.16g\n",sdxy0);
 printf("S2=%.16g\n",sdxy2);
 printf("S3=%.16g\n",sdxy3);
 printf("S4=%.16g\n",sdxy4);
 printf("S5=%.16g\n",sdxy5);
 printf("S6=%.16g\n",sdxy6);


   /* Helmert parameters */
 // det = s[0] + s[2];
 // h[0] = (s[3] + s[6]) / det; //x
 // h[1] = (s[4] - s[5]) / det; //x
 // h[2] = yc[0] - h[0] * xc[0] - h[1] * xc[1]; //X
 // h[3] = -h[1];
 // h[4] = h[0];
 // h[5] = yc[1] - h[3] * xc[0] - h[4] * xc[1]; //Y

 det = sdxy0 + sdxy2;
 h[0] = (sdxy3 + sdxy6) / det; //x
 h[1] = (sdxy4 - sdxy5) / det; //x
 h[2] = xmc - h[0] * xic - h[1] * yic; //X
 // h[3] = -h[1];
 // h[4] = h[0];
 h[5] = ymc + h[1] * xic - h[0] * yic; //Y

 printf("det=%.16g\n",det);
 printf("h[0]=%.16g\n",h[0]);
 printf("h[1]=%.16g\n",h[1]);

 /* alternative Helmert parameter set */
 mu = hypot(h[0], h[1]);
 theta = atan2(h[1], h[0]);

 // /* output parameters */
 printf("+k=%.16g +x_0=%.16g +y_0=%.16g +gamma=%.16g\n", mu, h[2], h[5], theta / M_PI * 180.);
 //

   printf("Hello World");
  //
  // /* output residuals */
  // if ((fp2 = fopen(argv[3], "w")) == NULL) {
  //   printf("can't create %s\n", "var.csv");
  //   exit(EXIT_FAILURE);
  // }
  // while (fgets(buf0, 1024, fp0) != NULL && fgets(buf1, 1024, fp1) != NULL) {
  //   sscanf(buf0, "%lf %lf", &x[0], &x[1]);
  //   sscanf(buf1, "%lf %lf", &y[0], &y[1]);
  //   /* model y */
  //   yh[0] = h[0] * x[0] + h[1] * x[1] + h[2];
  //   yh[1] = h[3] * x[0] + h[4] * x[1] + h[5];
  //   fprintf(fp2, "%.3f%c%.3f\n", yh[0] - y[0], SEP, yh[1] - y[1]);
  // }
  // fclose(fp2);
  // fclose(fp1);
  // fclose(fp0);
  //
  exit(EXIT_SUCCESS);
}
