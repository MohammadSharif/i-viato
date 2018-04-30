/*
 ============================================================================
 Name        : FFMPEGFramesToMovie.c
 Author      : Nicholas Hernandez - Hirad Pourtahmasbi
 ============================================================================
 */
#include <stdio.h>
#include <stdlib.h>
#include <time.h>
#include <unistd.h>
#include <errno.h>
#include <string.h>

int MAXLINE = 80;
void TokenizeStr(char str[], char *args[]);

int main(int argc, const char *argv[]) { // pass in file name
    // printf("args 0: %s \n args 1: %s \n args 2: %s \n args 3: %s \n args 4: %s \n  args 5: %s \n", argv[0], argv[1], argv[2], argv[3], argv[4], argv[5]);
    if (argc != 6) {
        printf("usage: ./FFMPEG_Frames_To_Movie FPS(#) width#xheight#  frames\\\%d.png dest.mp4 \n");
        return -1;
    }
    
    char *args[40];
    char str[512];
   
    snprintf(str, sizeof str, "ffmpeg -r %s -f image2 -s %s -start_number 1 -i %s -vframes %s -vcodec libx264 -crf 25  -pix_fmt yuv420p %s -y", argv[1], argv[2], argv[4], argv[3], argv[5]);
    // printf("%s \n", str);

    TokenizeStr(str, args); // tokenize the user imput and store the result in args

    pid_t fork_pid = fork();
    int child_index = 0;
    if (fork_pid == -1) { // if you cant for then print an error message and continue
        printf("error forking please try again");
        return -1;
    }
    if (fork_pid == 0) { // if this is the child
        printf("in the child");
        while (args[child_index] != '\0' && child_index < 22) {
            printf("%s ", args[child_index]);
            child_index = child_index + 1;
        }
        if (execvp(args[0], args) == -1) {    // execute the user imput
            printf("%s \n", strerror(errno)); // if there is an issue with what the user wrote print the error
        }
        exit(1); // exit this child process
    } else {                        // if forking worked and youre the parent
        waitpid(fork_pid, NULL, 0); // wait on the specific child specified by the pid
    }
    return 0; // process complete
}

void TokenizeStr(char str[], char *args[]) {
    // tokenizes the string
    int index = 0;
    int ptrIndex = 0;
    int ptrCount = 0;
    while (str[index]) { // while str[index] isnt null
        if (str[index] != ' ') { // if we encounter a char thats not a space
            if (ptrCount == 0) {                                  
                args[ptrIndex] = (char *)malloc(MAXLINE * sizeof(char)); // create a new line with at most 80 chars
                args[ptrIndex][ptrCount] = str[index];                   // copies the char
            } else {
                args[ptrIndex][ptrCount] = str[index]; //just copies the char
            }
            ptrCount++; // points to the next char to be filled in
        } else if (ptrCount != 0) {          // if there is a space and the last char we saw wasnt also a space
            args[ptrIndex][ptrCount] = '\0'; // set the last char on this line to null
            ptrIndex++;                      // move down to the next line
            ptrCount = 0;                    // now point to the beginning of the line
        }
        index += 1; // look at the next char of the user input
    }
    args[ptrIndex + 1] = '\0'; //make sure the last index is null
}
