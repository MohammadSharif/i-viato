/*
 ============================================================================
 Name        : FFMPEGMovieToFrames.c
 Author      : Nicholas Hernandez - Hirad Pourtahmasbi
 ============================================================================
 */
#include <stdio.h>
#include <stdlib.h>
#include <time.h>
#include <unistd.h>
#include <errno.h>
#include <string.h>

MAXLINE = 80;
void TokenizeStr(char str[], char *args[]);

int main(int argc, const char *argv[]) { // pass in file name
	// printf("args 0: %s \n args 1: %s \n args 2: %s \n args 3: %s \n", argv[0], argv[1], argv[2], argv[3]);
	if (argc != 4) {
		printf("usage: ./Pipleline_FFMPEG Source.Mov Dest\\\%d.png \n");
		return -1;
	}
	
	char *args[40];
	char str[256];

	// printf("Running 'ffprobe' with the argument: %s\n", argv[1]);
	snprintf(str, sizeof str, "ffprobe -v error -select_streams v:0 -show_entries stream=avg_frame_rate -of default=noprint_wrappers=1:nokey=1 %s ", argv[1]);
	
	TokenizeStr(str, args); // tokenize the user input and store the result in args
	
	pid_t fork_pid = fork();
	if (fork_pid == -1) { // if you cant for then print an error message and continue
		printf("error forking please try again");
		return -1;
	}
	if (fork_pid == 0) { // if this is the child
		if (execvp(args[0], args) == -1) {	//execute the user input
			printf("%s \n", strerror(errno)); // if there is an issue with what the user wrote print the error
		}
		exit(1); // exit this child process
	} else {						// if forking worked and you're the parent
		waitpid(fork_pid, NULL, 0); // wait on the specific child specified by the pid
	}
	// str = "";
	// printf("Running 'ffmpeg' with the arguments:\n %s \n %s \n", argv[1], argv[2], argv[3]);
	// snprintf(str, sizeof str, "ffmpeg -i %s -f fps=44100/1471 %s", argv[1], argv[2]);
	snprintf(str, sizeof str, "ffmpeg -i %s -r %s %s" , argv[1], argv[2], argv[3]);
	TokenizeStr(str, args); // tokenize the user input and store the result in args
	fork_pid = fork();
	if (fork_pid == -1) { // if you cant for then print an error message and continue
		printf("error forking please try again");
		return -1;
	}
	if (fork_pid == 0) { // if this is the child
		if (execvp(args[0], args) == -1) {	//execute the user input
			printf("%s \n", strerror(errno)); // if there is an issue with what the user wrote print the error
		}
		exit(1); // exit this child process
	} else {											// if forking worked and you're the parent
		waitpid(fork_pid, NULL, 0); // wait on the specific child specified by the pid
	}
	// printf("FFMPEGMovieToFrames done!\n");
	return 0; // process complete
}

void TokenizeStr(char str[], char *args[]) {
	// tokenizes the string
	int index = 0;
	int ptrIndex = 0;
	int ptrCount = 0;
	while (str[index]) { // while str[index] isn't null
		if (str[index] != ' ') { // if we encounter a char thats not a space
			if (ptrCount == 0) {
				args[ptrIndex] = (char *)malloc(MAXLINE * sizeof(char)); // create a new line with at most 80 chars
				args[ptrIndex][ptrCount] = str[index];									 // copies the char
			} else {
				args[ptrIndex][ptrCount] = str[index]; //just copies the char
			}
			ptrCount++; // points to the next char to be filled in
		} else if (ptrCount != 0) {				 // if there is a space and the last char we saw wasn't also a space
			args[ptrIndex][ptrCount] = '\0'; // set the last char on this line to null
			ptrIndex++;											 // move down to the next line
			ptrCount = 0;										 // now point to the beginning of the line
		}
		index += 1; // look at the next char of the user input
	}
	args[ptrIndex + 1] = '\0'; // make sure the last index is null
}
