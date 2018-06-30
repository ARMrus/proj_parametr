#include <stdio.h>
#include <stdlib.h>
#include <math.h>
 
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
int main(int argc, char *argv[])
{
  char buf0[1024], buf1[1024];
  double x[2], y[2];
  double xc[2], yc[2];
  double dx[2], dy[2];
  double s[7] = {0., 0., 0., 0., 0.};
  double det, h[6];
  double mu, theta;
  double yh[2];
  int i;
  FILE *fp0, *fp1, *fp2;
 
  if (argc < 4) {
    printf("Usage: helmkey <coord1> <coord2>\n");
    exit(EXIT_FAILURE);
  }
 
  if ((fp0 = fopen(argv[1], "r")) == NULL) {
    printf("can't open %s\n", argv[1]);
    exit(EXIT_FAILURE);
  }
 
  if ((fp1 = fopen(argv[2], "r")) == NULL) {
    printf("can't open %s\n", argv[2]);
    exit(EXIT_FAILURE);
  }
 
  /* coordinate sums */
  while (fgets(buf0, 1024, fp0) != NULL && fgets(buf1, 1024, fp1) != NULL) {
    sscanf(buf0, "%lf %lf", &x[0], &x[1]);
    sscanf(buf1, "%lf %lf", &y[0], &y[1]);
    s[0] += x[0];
    s[1] += x[1];
    s[2] += y[0];
    s[3] += y[1];
    s[4] += 1.;
  }
  rewind(fp0);
  rewind(fp1);
 
  /* centrum gravitatis */
  for (i = 0; i < 2; i++) {
    xc[i] = s[i] / s[4];
    yc[i] = s[2 + i] / s[4];
  }
 
  /* sums of products */
  for (i = 0; i < 7; i++)
    s[i] = 0.;
  while (fgets(buf0, 1024, fp0) != NULL && fgets(buf1, 1024, fp1) != NULL) {
    sscanf(buf0, "%lf %lf", &x[0], &x[1]);
    sscanf(buf1, "%lf %lf", &y[0], &y[1]);
    /* coordinate differences */
    dx[0] = x[0] - xc[0];
    dx[1] = x[1] - xc[1];
    dy[0] = y[0] - yc[0];
    dy[1] = y[1] - yc[1];
    /* summation */
    s[0] += dx[0] * dx[0];
    /*s[1] += dx[0] * dx[1];*/
    s[2] += dx[1] * dx[1];
    s[3] += dx[0] * dy[0];
    s[4] += dx[1] * dy[0];
    s[5] += dx[0] * dy[1];
    s[6] += dx[1] * dy[1];
  }
  rewind(fp0);
  rewind(fp1);
 
  /* Helmert parameters */
  det = s[0] + s[2];
  h[0] = (s[3] + s[6]) / det;
  h[1] = (s[4] - s[5]) / det;
  h[2] = yc[0] - h[0] * xc[0] - h[1] * xc[1];
  h[3] = -h[1];
  h[4] = h[0];
  h[5] = yc[1] - h[3] * xc[0] - h[4] * xc[1];
 
  /* alternative Helmert parameter set */
  mu = hypot(h[0], h[1]);
  theta = atan2(h[1], h[0]);
 
  /* output parameters */
  printf("+k=%.16g +x_0=%.16g +y_0=%.16g +gamma=%.16g\n",
	 mu, h[2], h[5], theta / M_PI * 180.);
 
  /* output residuals */
  if ((fp2 = fopen(argv[3], "w")) == NULL) {
    printf("can't create %s\n", "var.csv");
    exit(EXIT_FAILURE);
  }
  while (fgets(buf0, 1024, fp0) != NULL && fgets(buf1, 1024, fp1) != NULL) {
    sscanf(buf0, "%lf %lf", &x[0], &x[1]);
    sscanf(buf1, "%lf %lf", &y[0], &y[1]);
    /* model y */
    yh[0] = h[0] * x[0] + h[1] * x[1] + h[2];
    yh[1] = h[3] * x[0] + h[4] * x[1] + h[5];
    fprintf(fp2, "%.3f%c%.3f\n", yh[0] - y[0], SEP, yh[1] - y[1]);
  }
  fclose(fp2);
  fclose(fp1);
  fclose(fp0);
 
  exit(EXIT_SUCCESS);
}