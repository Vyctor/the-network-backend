import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../infra/prisma/prisma.service';

export interface FollowInput {
  followerId: number;
  followingId: number;
}

export interface UnfollowInput {
  followerId: number;
  followingId: number;
}

export interface IsFollowingInput {
  followerId: number;
  followingId: number;
}

@Injectable()
export class FollowsRepositoryService {
  constructor(private readonly prismaService: PrismaService) {}

  async follow(data: FollowInput): Promise<void> {
    const { followerId, followingId } = data;
    try {
      await this.prismaService.follows.create({
        data: {
          followerId,
          followingId,
        },
      });
    } catch (err) {
      throw err;
    }
  }

  async unfollow(data: UnfollowInput): Promise<void> {
    const { followerId, followingId } = data;
    try {
      await this.prismaService.follows.delete({
        where: {
          followerId_followingId: {
            followerId,
            followingId,
          },
        },
      });
    } catch (err) {
      throw err;
    }
  }

  async isFollowing(data: IsFollowingInput): Promise<boolean> {
    const { followerId, followingId } = data;
    try {
      const follows = await this.prismaService.follows.findUnique({
        where: {
          followerId_followingId: {
            followerId,
            followingId,
          },
        },
      });

      return !!follows;
    } catch (err) {
      throw err;
    }
  }

  async countFollowersByUserId(userId: number): Promise<number> {
    try {
      return await this.prismaService.follows.count({
        where: {
          followingId: userId,
        },
      });
    } catch (err) {
      throw err;
    }
  }

  async countFollowingByUserId(userId: number): Promise<number> {
    try {
      return await this.prismaService.follows.count({
        where: {
          followerId: userId,
        },
      });
    } catch (err) {
      throw err;
    }
  }

  async findFollowersByUserId(userId: number): Promise<number[]> {
    try {
      const followers = await this.prismaService.follows.findMany({
        where: {
          followingId: userId,
        },
      });

      return followers.map((follower) => follower.followerId);
    } catch (err) {
      throw err;
    }
  }

  async findFollowingByUserId(userId: number): Promise<number[]> {
    try {
      const following = await this.prismaService.follows.findMany({
        where: {
          followerId: userId,
        },
      });

      return following.map((follow) => follow.followingId);
    } catch (err) {
      throw err;
    }
  }
}
